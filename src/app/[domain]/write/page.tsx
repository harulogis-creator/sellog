import { createClient } from "@/utils/supabase/server";
import { BlogForbiddenBlock } from "@/components/blog/BlogForbiddenBlock";
import { BlogNotFoundBlock } from "@/components/blog/BlogNotFoundBlock";
import { DomainHeader } from "@/components/layout/DomainHeader";
import { DomainPageContainer } from "@/components/layout/DomainPageContainer";
import { WriteForm } from "./WriteForm";

interface WritePageProps {
  params: Promise<{ domain: string }>;
}

function safeDecodeDomain(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export default async function WritePage({ params }: WritePageProps) {
  const raw = await Promise.resolve(params);
  const domain = safeDecodeDomain(raw.domain);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: blog } = await supabase
    .from("blogs")
    .select("id, name, owner_id")
    .eq("subdomain", domain)
    .single();

  if (!blog) return <BlogNotFoundBlock />;

  const isOwner = blog.owner_id === null || blog.owner_id === user?.id;
  if (!isOwner) {
    return (
      <BlogForbiddenBlock
        domain={domain}
        descriptionKey="write"
        linkTo="loginAndBlog"
      />
    );
  }

  const { data: products = [] } = await supabase
    .from("products")
    .select("id, name, price, image_url, description")
    .eq("blog_id", blog.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <DomainHeader
        domain={domain}
        blogName={blog.name}
        subtitleKey="blog.subtitle.write"
        listHref={`/${domain}/posts`}
        listLabelKey="blog.listLabel.posts"
      />
      <DomainPageContainer>
        <div className="rounded-3xl border border-neutral-200/60 bg-white shadow-lg shadow-neutral-200/40 p-6 sm:p-8">
          <WriteForm blogId={blog.id} domain={domain} products={products ?? undefined} />
        </div>
      </DomainPageContainer>
    </main>
  );
}
