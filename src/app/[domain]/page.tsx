import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { BlogHomeContent } from "@/components/blog/BlogHomeContent";
import { DomainBlogUnavailableBlock } from "@/components/blog/DomainBlogUnavailableBlock";
import { getBaseUrl } from "@/lib/site";
import { supabase as supabaseAnon } from "@/lib/supabase";
import { isValidLocale } from "@/lib/i18n";

interface DomainPageProps {
  params: Promise<{ domain: string }>;
}

function safeDecodeDomain(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export async function generateMetadata({ params }: DomainPageProps): Promise<Metadata> {
  const raw = await Promise.resolve(params);
  const domain = safeDecodeDomain(raw.domain);
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/${encodeURIComponent(domain)}`;

  if (!supabaseAnon) return { title: "Sellog" };
  try {
    const { data: blog } = await supabaseAnon
      .from("blogs")
      .select("name, description")
      .eq("subdomain", domain)
      .single();
    if (!blog) return { title: "Sellog" };

    const title = blog.name;
    const description = blog.description ?? `${blog.name} 블로그`;

    return {
      title: `${title} | Sellog`,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        type: "website",
        url: canonicalUrl,
        siteName: "Sellog",
        title,
        description,
        locale: "ko_KR",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return { title: "Sellog" };
  }
}

export default async function DomainPage({ params }: DomainPageProps) {
  const raw = await Promise.resolve(params);
  const domain = safeDecodeDomain(raw.domain);
  if (isValidLocale(domain)) redirect(`/${domain}/www`);

  let blog: { id: string; name: string; description: string | null; owner_id: string | null } | null = null;
  let posts: { id: string; slug: string; title: string; thumbnail_url: string | null; published_at: string | null; created_at: string }[] = [];
  let ownerProfile: { display_name: string | null; avatar_url: string | null } | null = null;

  const supabase = await createClient();
  if (supabase) try {
    const res = await supabase
      .from("blogs")
      .select("id, name, description, owner_id")
      .eq("subdomain", domain)
      .single();
    if (!res.error && res.data) {
      const b = res.data;
      blog = b;
      if (b.owner_id) {
        const profileRes = await supabase
          .from("profiles")
          .select("display_name, avatar_url")
          .eq("id", b.owner_id)
          .single();
        if (!profileRes.error && profileRes.data) ownerProfile = profileRes.data;
      }
      const postsRes = await supabase
        .from("posts")
        .select("id, slug, title, thumbnail_url, published_at, created_at")
        .eq("blog_id", b.id)
        .not("published_at", "is", null)
        .order("published_at", { ascending: false })
        .limit(50);
      if (postsRes.data) posts = postsRes.data;
    }
  } catch {
    // Supabase 미설정 또는 네트워크 오류
  }

  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const isOwner = !!blog && (blog.owner_id === null || blog.owner_id === user?.id);

  if (!blog) {
    return <DomainBlogUnavailableBlock domain={domain} />;
  }

  const baseUrl = getBaseUrl();
  const blogUrl = `${baseUrl}/${encodeURIComponent(domain)}`;
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: blog.name,
    description: blog.description ?? `${blog.name} 블로그`,
    url: blogUrl,
    publisher: { "@type": "Organization", name: blog.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <BlogHomeContent
        domain={domain}
        blog={blog}
        isOwner={isOwner}
        posts={posts}
        ownerProfile={ownerProfile}
      />
    </>
  );
}
