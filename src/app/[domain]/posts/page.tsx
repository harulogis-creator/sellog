import { createClient } from "@/utils/supabase/server";
import { BlogForbiddenBlock } from "@/components/blog/BlogForbiddenBlock";
import { BlogNotFoundBlock } from "@/components/blog/BlogNotFoundBlock";
import { DomainHeader } from "@/components/layout/DomainHeader";
import { DomainPageContainer } from "@/components/layout/DomainPageContainer";
import { PostsListWithFilter } from "./PostsListWithFilter";

interface PostsPageProps {
  params: Promise<{ domain: string }>;
}

function safeDecodeDomain(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export default async function PostsPage({ params }: PostsPageProps) {
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
        descriptionKey="posts"
        linkTo="blog"
      />
    );
  }

  type PostRow = { id: string; slug: string; title: string; thumbnail_url: string | null; published_at: string | null; updated_at: string };
  const { data: postsData } = await supabase
    .from("posts")
    .select("id, slug, title, thumbnail_url, published_at, updated_at")
    .eq("blog_id", blog.id)
    .order("updated_at", { ascending: false });

  const posts: PostRow[] = postsData ?? [];
  const drafts = posts.filter((p) => !p.published_at);
  const published = posts.filter((p) => p.published_at);

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-background">
      <DomainHeader
        domain={domain}
        blogName={blog.name}
        subtitleKey="blog.subtitle.posts"
        listHref={`/${domain}/posts`}
        listLabelKey="blog.listLabel.posts"
        actionConfig={{ labelKey: "blog.action.newPost", href: `/${domain}/write` }}
      />
      <DomainPageContainer className="space-y-8">
        <PostsListWithFilter
          domain={domain}
          posts={posts}
          drafts={drafts}
          published={published}
        />
      </DomainPageContainer>
    </main>
  );
}
