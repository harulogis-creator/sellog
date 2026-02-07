"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/LocaleProvider";
import { LogoutButton } from "./LogoutButton";

type User = { email?: string | null } | null;
type DropdownId = "product" | "resources" | null;

const productItems = [
  { href: "#features", labelKey: "www.nav.features" },
  { href: "#how", labelKey: "www.nav.how" },
  { href: "#pricing", labelKey: "www.nav.pricing" },
] as const;

const resourceItems = [
  { href: "#faq", labelKey: "www.nav.faq" },
  { href: "/check", labelKey: "www.footer.connectionCheck" },
] as const;

export function WwwHeader() {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const t = useTranslations();
  const basePath = `/${locale}/www`;
  const navLinksForMobile = [
    ...productItems.map((p) => ({ href: `${basePath}${p.href}`, labelKey: p.labelKey })),
    ...resourceItems.map((r) => ({ href: r.href.startsWith("#") ? `${basePath}${r.href}` : `${basePath}${r.href}`, labelKey: r.labelKey })),
  ];

  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpenDropdown(null);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const renderDropdown = (id: "product" | "resources") => {
    const items = id === "product" ? productItems : resourceItems;
    const isOpen = openDropdown === id;
    const panelId = `megamenu-${id}`;
    return (
      <div className="relative">
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-2"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={`megamenu-trigger-${id}`}
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          onMouseEnter={() => setOpenDropdown(id)}
        >
          {t(`www.megamenu.${id}`)}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
        </button>
        {isOpen && (
          <div
            id={panelId}
            role="menu"
            aria-labelledby={`megamenu-trigger-${id}`}
            className="absolute top-full left-0 mt-0.5 min-w-[180px] rounded-xl border border-neutral-200 bg-white py-2 shadow-lg z-[60]"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {items.map(({ href, labelKey }) => {
              const to = href.startsWith("#") ? `${basePath}${href}` : `${basePath}${href}`;
              return (
                <Link
                  key={labelKey}
                  href={to}
                  role="menuitem"
                  className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  onClick={() => setOpenDropdown(null)}
                >
                  {t(labelKey)}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm" : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
          <Link
            href={basePath}
            className="text-xl font-semibold tracking-tight text-neutral-900 hover:text-neutral-700 transition-colors"
          >
            Sellog
          </Link>
          <nav ref={menuRef} className="hidden md:flex items-center gap-6" aria-label={t("www.nav.ariaMainMenu")}>
            {renderDropdown("product")}
            {renderDropdown("resources")}
          </nav>
          <div className="flex items-center gap-3">
            {loading ? (
              <span className="text-sm text-neutral-400">...</span>
            ) : user ? (
              <>
                <span className="hidden sm:inline text-sm text-neutral-500 truncate max-w-[140px]">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={basePath}>{t("www.nav.myBlog")}</Link>
                </Button>
                <LogoutButton />
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                  <Link href={`${basePath}/login`}>{t("www.nav.login")}</Link>
                </Button>
                <Button size="sm" className="hidden sm:inline-flex" asChild>
                  <Link href={`${basePath}/join`}>{t("www.nav.signup")}</Link>
                </Button>
              </>
            )}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              onClick={() => setMobileOpen(true)}
              aria-label={t("www.nav.ariaOpenMenu")}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 오버레이 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 md:hidden"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 z-[101] h-full w-full max-w-sm bg-white shadow-xl md:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16 pb-8 px-6">
          <button
            type="button"
            className="absolute top-4 right-4 p-2 rounded-lg text-neutral-500 hover:bg-neutral-100"
            onClick={() => setMobileOpen(false)}
            aria-label={t("www.nav.ariaCloseMenu")}
          >
            <X className="h-5 w-5" />
          </button>
          <nav className="flex flex-col gap-1" aria-label={t("www.nav.ariaMobileMenu")}>
            {navLinksForMobile.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className="py-3 text-base font-medium text-neutral-900 border-b border-neutral-100"
                onClick={() => setMobileOpen(false)}
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            {!user && (
              <>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`${basePath}/login`} onClick={() => setMobileOpen(false)}>{t("www.nav.login")}</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href={`${basePath}/join`} onClick={() => setMobileOpen(false)}>{t("www.nav.signup")}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
