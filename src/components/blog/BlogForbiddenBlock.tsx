"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export type ForbiddenDescriptionKey =
  | "posts"
  | "settings"
  | "products"
  | "write"
  | "postEdit"
  | "productEdit";

export type ForbiddenLinkTo =
  | "blog"
  | "login"
  | "loginAndBlog"
  | "viewPost"
  | "productList";

interface BlogForbiddenBlockProps {
  domain: string;
  descriptionKey: ForbiddenDescriptionKey;
  linkTo: ForbiddenLinkTo;
  postSlug?: string;
}

export function BlogForbiddenBlock({
  domain,
  descriptionKey,
  linkTo,
  postSlug,
}: BlogForbiddenBlockProps) {
  const { locale, t } = useLocale();

  const description = t(`blog.forbidden.description.${descriptionKey}`);

  const renderLinks = () => {
    const base = "text-neutral-600 underline hover:text-neutral-900 transition-colors";
    if (linkTo === "blog") {
      return (
        <Link href={`/${domain}`} className={base}>
          {t("blog.forbidden.goBlog")}
        </Link>
      );
    }
    if (linkTo === "login") {
      return (
        <Link href={`/${locale}/www/login`} className={base}>
          {t("blog.forbidden.goLogin")}
        </Link>
      );
    }
    if (linkTo === "loginAndBlog") {
      return (
        <>
          <Link href={`/${locale}/www/login`} className={base}>
            {t("blog.forbidden.goLogin")}
          </Link>
          <span className="mx-2 text-neutral-400">|</span>
          <Link href={`/${domain}`} className={base}>
            {t("blog.forbidden.goBlog")}
          </Link>
        </>
      );
    }
    if (linkTo === "viewPost") {
      if (postSlug) {
        return (
          <Link href={`/${domain}/post/${postSlug}`} className={base}>
            {t("blog.forbidden.viewPost")}
          </Link>
        );
      }
      return (
        <Link href={`/${domain}`} className={base}>
          {t("blog.forbidden.goBlog")}
        </Link>
      );
    }
    if (linkTo === "productList") {
      return (
        <Link href={`/${domain}/products`} className={base}>
          {t("blog.forbidden.productList")}
        </Link>
      );
    }
    return null;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#fbfbfd]">
      <h1 className="text-xl font-semibold text-neutral-900 mb-2">
        {t("blog.forbidden.title")}
      </h1>
      <p className="text-neutral-600 mb-6">{description}</p>
      {renderLinks()}
    </main>
  );
}
