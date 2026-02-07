"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";
import { DomainHeader } from "@/components/layout/DomainHeader";
import { DomainOwnerProfile } from "@/components/layout/DomainOwnerProfile";

type Post = {
  id: string;
  slug: string;
  title: string;
  thumbnail_url: string | null;
  published_at: string | null;
  created_at: string;
};

interface BlogHomeContentProps {
  domain: string;
  blog: { name: string; description: string | null; owner_id: string | null };
  isOwner: boolean;
  posts: Post[];
  ownerProfile: { display_name: string | null; avatar_url: string | null } | null;
}

export function BlogHomeContent({
  domain,
  blog,
  isOwner,
  posts,
  ownerProfile,
}: BlogHomeContentProps) {
  const { t, locale } = useLocale();

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <DomainHeader
        domain={domain}
        blogName={blog.name}
        showBackLink={false}
        actions={
          isOwner ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${domain}/settings`}>{t("blog.nav.settings")}</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${domain}/posts`}>{t("blog.nav.posts")}</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/${domain}/products`}>{t("blog.nav.products")}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={`/${domain}/write`}>{t("blog.nav.write")}</Link>
              </Button>
            </>
          ) : undefined
        }
      />
      <div className="px-6 sm:px-8 py-4 max-w-2xl space-y-2">
        {blog.description && (
          <p className="text-[15px] text-neutral-500 leading-relaxed">
            {blog.description}
          </p>
        )}
        {blog.owner_id && (
          <DomainOwnerProfile
            displayName={ownerProfile?.display_name ?? null}
            avatarUrl={ownerProfile?.avatar_url ?? null}
            fallbackLabel={blog.name}
          />
        )}
      </div>
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-6">
          {t("blog.recentPosts")}
        </h2>
        {posts.length === 0 ? (
          <p className="text-neutral-500 py-10 text-center text-[15px]">
            {t("blog.noPublishedPosts")}
          </p>
        ) : (
          <div className="rounded-3xl bg-white border border-neutral-200/60 shadow-lg shadow-neutral-200/30 overflow-hidden">
            <ul className="divide-y divide-neutral-100">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/${domain}/post/${post.slug}`}
                    className="flex items-center gap-4 px-5 py-4 min-h-[72px] active:bg-neutral-50/80 transition-colors"
                  >
                    {post.thumbnail_url ? (
                      <img
                        src={post.thumbnail_url}
                        alt=""
                        className="h-14 w-20 shrink-0 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="h-14 w-20 shrink-0 rounded-xl bg-neutral-100" />
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-neutral-900 block truncate">{post.title}</span>
                      <span className="text-sm text-neutral-500">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US")
                          : ""}
                      </span>
                    </div>
                    <span className="text-neutral-400 shrink-0" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
