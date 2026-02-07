import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostBody } from "@/components/PostBody";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/site";
import { supabase as supabaseAnon } from "@/lib/supabase";

interface PostPageProps {
  params: Promise<{ domain: string; slug: string }>;
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/** 마크다운에서 OG용 짧은 텍스트 추출 (약 160자) */
function excerptFromMd(md: string | null, maxLen: number = 160): string {
  if (!md) return "";
  const plain = md
    .replace(/\[product:[^\]]+\]/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_~`]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen - 1).trimEnd() + "…";
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const raw = await Promise.resolve(params);
  const domain = safeDecode(raw.domain);
  const slug = safeDecode(raw.slug);
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/${encodeURIComponent(domain)}/post/${encodeURIComponent(slug)}`;

  if (!supabaseAnon) return { title: "Sellog" };
  try {
    const { data: blog } = await supabaseAnon
      .from("blogs")
      .select("id, name")
      .eq("subdomain", domain)
      .single();
    if (!blog) return { title: "Sellog" };
    const { data: post } = await supabaseAnon
      .from("posts")
      .select("title, body_md, meta_description, thumbnail_url, published_at")
      .eq("blog_id", blog.id)
      .eq("slug", slug)
      .single();
    if (!post) return { title: "Sellog" };

    const title = `${post.title} | ${blog.name}`;
    const description = (post.meta_description && post.meta_description.trim()) || excerptFromMd(post.body_md) || post.title;

    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        type: "article",
        url: canonicalUrl,
        siteName: "Sellog",
        title: post.title,
        description,
        locale: "ko_KR",
        publishedTime: post.published_at ?? undefined,
        ...(post.thumbnail_url && { images: [{ url: post.thumbnail_url }] }),
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
      },
    };
  } catch {
    return { title: "Sellog" };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const raw = await Promise.resolve(params);
  const domain = safeDecode(raw.domain);
  const slug = safeDecode(raw.slug);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: blog } = await supabase
    .from("blogs")
    .select("id, name, owner_id")
    .eq("subdomain", domain)
    .single();

  if (!blog) return notFound();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("blog_id", blog.id)
    .eq("slug", slug)
    .single();

  if (!post || !post.published_at) return notFound();

  const productsById = new Map<string, { id: string; name: string; price: number; image_url: string | null; description: string | null }>();
  const bodyMd = post.body_md ?? "";
  const uuidRegex = /\[product:([a-f0-9-]{36})\]/gi;
  let match: RegExpExecArray | null;
  const productIds: string[] = [];
  while ((match = uuidRegex.exec(bodyMd)) !== null) {
    productIds.push(match[1].toLowerCase());
  }
  if (productIds.length > 0) {
    const { data: products } = await supabase
      .from("products")
      .select("id, name, price, image_url, description")
      .in("id", Array.from(new Set(productIds)));
    type ProductRow = { id: string; name: string; price: number; image_url: string | null; description: string | null };
    products?.forEach((p: ProductRow) => productsById.set(p.id.toLowerCase(), p));
  }

  const isOwner = blog.owner_id === null || blog.owner_id === user?.id;
  const baseUrl = getBaseUrl();
  const articleUrl = `${baseUrl}/${encodeURIComponent(domain)}/post/${encodeURIComponent(post.slug)}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: excerptFromMd(post.body_md) || post.title,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    author: { "@type": "Organization", name: blog.name },
    publisher: { "@type": "Organization", name: blog.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
  };

  const productList = Array.from(productsById.values());
  const productsJsonLd =
    productList.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: productList.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              "@id": `${articleUrl}#product-${p.id}`,
              name: p.name,
              description: p.description ?? undefined,
              image: p.image_url ?? undefined,
              offers: {
                "@type": "Offer",
                price: p.price,
                priceCurrency: "KRW",
              },
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {productsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
        />
      )}
      <main className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-2xl px-6 py-5 sm:px-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link
            href={`/${domain}`}
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← {blog.name}
          </Link>
          <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight mt-1">
            {blog.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/${domain}/posts`}>목록</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/${domain}`}>홈</Link>
          </Button>
          {isOwner && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${domain}/post/${slug}/edit`}>수정</Link>
            </Button>
          )}
        </div>
      </header>
      <article className="max-w-2xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight mb-4">
          {post.title}
        </h1>
        <time
          dateTime={post.published_at ?? undefined}
          className="text-sm text-neutral-500 block mb-10"
        >
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString("ko-KR")
            : ""}
        </time>
        <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed">
          {post.body_md ? (
            <PostBody bodyMd={post.body_md} productsById={productsById} domain={domain} />
          ) : (
            <p className="text-neutral-500">내용이 없습니다.</p>
          )}
        </div>
      </article>
    </main>
    </>
  );
}
