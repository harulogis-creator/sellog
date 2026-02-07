"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { PostDeleteButton } from "./PostDeleteButton";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  thumbnail_url: string | null;
  published_at: string | null;
  updated_at: string;
};

type Filter = "all" | "drafts" | "published";

interface PostsListWithFilterProps {
  domain: string;
  posts: PostRow[];
  drafts: PostRow[];
  published: PostRow[];
}

export function PostsListWithFilter({
  domain,
  posts,
  drafts,
  published,
}: PostsListWithFilterProps) {
  const { t, locale } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "drafts" ? drafts : filter === "published" ? published : posts;
  const isEmpty = posts.length === 0;

  const dateLocale = locale === "ko" ? "ko-KR" : "en-US";
  const countSuffix = t("blog.posts.countSuffix");

  if (isEmpty) {
    return (
      <EmptyState
        titleKey="blog.posts.emptyTitle"
        descriptionKey="blog.posts.emptyDesc"
        action={{ href: `/${domain}/write`, labelKey: "blog.posts.emptyAction" }}
      />
    );
  }

  const filterOptions = [
    { value: "all" as const, labelKey: "blog.posts.filterAll" as const, count: posts.length },
    { value: "drafts" as const, labelKey: "blog.posts.filterDrafts" as const, count: drafts.length },
    { value: "published" as const, labelKey: "blog.posts.filterPublished" as const, count: published.length },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t("blog.posts.filterDrafts")} {drafts.length}{countSuffix} · {t("blog.posts.filterPublished")} {published.length}{countSuffix}
        </p>
        <div
          className="flex rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100/80 dark:bg-neutral-800/80 p-0.5"
          role="tablist"
          aria-label={t("blog.posts.filterAria")}
        >
          {filterOptions.map(({ value, labelKey, count }) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              aria-label={`${t(labelKey)} ${count}${countSuffix}`.trim()}
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === value
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              }`}
            >
              {t(labelKey)} {count}{countSuffix}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 py-8 text-center">
          {filter === "drafts" && t("blog.posts.noDrafts")}
          {filter === "published" && t("blog.posts.noPublished")}
        </p>
      ) : (
        <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-700 shadow-lg shadow-neutral-200/30 dark:shadow-none overflow-hidden">
          <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {filtered.map((p) => {
              const isDraft = !p.published_at;
              return (
                <li
                  key={p.id}
                  className="flex items-center gap-3 px-5 py-4 min-h-[56px]"
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-neutral-900 dark:text-neutral-100 block truncate">
                      {p.title}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {isDraft
                        ? `${t("blog.posts.editedAt")}: ${new Date(p.updated_at).toLocaleDateString(dateLocale)}`
                        : `${t("blog.posts.publishedAt")}: ${new Date(p.published_at!).toLocaleDateString(dateLocale)}`}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                      isDraft
                        ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                        : "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                    }`}
                  >
                    {isDraft ? t("blog.posts.badgeDraft") : t("blog.posts.badgePublished")}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/${domain}/post/${p.slug}/edit`}>{t("blog.posts.edit")}</Link>
                    </Button>
                    <PostDeleteButton
                      postId={p.id}
                      title={p.title}
                      domain={domain}
                    />
                    {!isDraft && (
                      <Link
                        href={`/${domain}/post/${p.slug}`}
                        className="flex items-center justify-center w-8 h-8 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
                        aria-label={t("blog.posts.view")}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
