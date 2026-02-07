"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Package, Settings } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const tabs: { href: (d: string) => string; labelKey: "home" | "posts" | "products" | "settings"; Icon: typeof Home }[] = [
  { href: (d) => `/${d}`, labelKey: "home", Icon: Home },
  { href: (d) => `/${d}/posts`, labelKey: "posts", Icon: FileText },
  { href: (d) => `/${d}/products`, labelKey: "products", Icon: Package },
  { href: (d) => `/${d}/settings`, labelKey: "settings", Icon: Settings },
];

export function DomainBottomNav({ domain }: { domain: string }) {
  const pathname = usePathname();
  const { t } = useLocale();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-neutral-200/80 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/95 backdrop-blur-2xl"
      role="navigation"
      aria-label={t("blog.aria.bottomNav")}
    >
      <div className="flex items-center justify-around h-14 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ href, labelKey, Icon }) => {
          const label = t(`blog.bottomNav.${labelKey}`);
          const hrefPath = href(domain);
          const isActive =
            pathname === hrefPath || (pathname?.startsWith(hrefPath + "/") ?? false);
          return (
            <Link
              key={labelKey}
              href={hrefPath}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full min-w-0 px-2 transition-colors min-h-[44px] ${
                isActive ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-400"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-6 h-6 shrink-0" strokeWidth={isActive ? 2.5 : 2} aria-hidden />
              <span className="text-[10px] font-medium truncate w-full text-center">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
