import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { BlogForbiddenBlock } from "@/components/blog/BlogForbiddenBlock";
import { PostEditHeader } from "@/components/blog/PostEditHeader";
import { DomainPageContainer } from "@/components/layout/DomainPageContainer";
import { EditForm } from "./EditForm";

interface EditPageProps {
  params: Promise<{ domain: string; slug: string }>;
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export default async function EditPostPage({ params }: EditPageProps) {
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

  if (!blog) notFound();

  const isOwner = blog.owner_id === null || blog.owner_id === user?.id;
  if (!isOwner) {
    return (
      <BlogForbiddenBlock
        domain={domain}
        descriptionKey="postEdit"
        linkTo="viewPost"
        postSlug={slug}
      />
    );
  }

  const { data: post } = await supabase
    .from("posts")
    .select("id, title, slug, body_md, meta_description, thumbnail_url, published_at")
    .eq("blog_id", blog.id)
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  const { data: products = [] } = await supabase
    .from("products")
    .select("id, name, price, image_url, description")
    .eq("blog_id", blog.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <PostEditHeader domain={domain} slug={slug} />
      <DomainPageContainer>
        <EditForm
          postId={post.id}
          blogId={blog.id}
          domain={domain}
          initialTitle={post.title}
          initialSlug={post.slug}
          initialBodyMd={post.body_md ?? ""}
          initialMetaDescription={post.meta_description ?? ""}
          initialThumbnailUrl={post.thumbnail_url ?? ""}
          initialPublished={!!post.published_at}
          products={products ?? undefined}
        />
      </DomainPageContainer>
    </main>
  );
}
