import { createClient } from "@/utils/supabase/server";
import { BlogForbiddenBlock } from "@/components/blog/BlogForbiddenBlock";
import { BlogNotFoundBlock } from "@/components/blog/BlogNotFoundBlock";
import { BlogSectionHeader } from "@/components/blog/BlogSectionHeader";
import { DomainHeader } from "@/components/layout/DomainHeader";
import { DomainPageContainer } from "@/components/layout/DomainPageContainer";
import { BlogSettingsForm } from "./BlogSettingsForm";
import { ProfileSettingsForm } from "./ProfileSettingsForm";
import { SettingsProfileDesc } from "./SettingsProfileDesc";

interface SettingsPageProps {
  params: Promise<{ domain: string }>;
}

function safeDecodeDomain(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const raw = await Promise.resolve(params);
  const domain = safeDecodeDomain(raw.domain);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: blog } = await supabase
    .from("blogs")
    .select("id, name, description, custom_domain, owner_id")
    .eq("subdomain", domain)
    .single();

  let profile: { display_name: string | null; avatar_url: string | null } | null = null;
  if (user) {
    const { data: p } = await supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("id", user.id)
      .single();
    if (p) profile = p;
  }

  if (!blog) return <BlogNotFoundBlock />;

  const isOwner = blog.owner_id === null || blog.owner_id === user?.id;
  if (!isOwner) {
    return (
      <BlogForbiddenBlock
        domain={domain}
        descriptionKey="settings"
        linkTo="blog"
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <DomainHeader
        domain={domain}
        blogName={blog.name}
        subtitleKey="blog.subtitle.settings"
        listHref={`/${domain}/posts`}
        listLabelKey="blog.listLabel.posts"
      />
      <DomainPageContainer>
        <section className="space-y-5 rounded-3xl border border-neutral-200/60 bg-white shadow-lg shadow-neutral-200/40 p-6 sm:p-8">
          <BlogSectionHeader messageKey="blog.section.blogInfo" />
          <BlogSettingsForm
            domain={domain}
            initialName={blog.name}
            initialDescription={blog.description}
            initialCustomDomain={blog.custom_domain ?? null}
          />
        </section>
        <section className="mt-8 space-y-5 rounded-3xl border border-neutral-200/60 bg-white shadow-lg shadow-neutral-200/40 p-6 sm:p-8">
          <BlogSectionHeader messageKey="blog.section.myProfile" />
          <SettingsProfileDesc />
          <ProfileSettingsForm
            initialDisplayName={profile?.display_name ?? null}
            initialAvatarUrl={profile?.avatar_url ?? null}
          />
        </section>
      </DomainPageContainer>
    </main>
  );
}
