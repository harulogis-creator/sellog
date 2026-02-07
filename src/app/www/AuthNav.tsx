"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./LogoutButton";

type User = { email?: string | null } | null;

export function AuthNav() {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const basePath = `/${locale}/www`;
  const t = useTranslations();
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="absolute top-8 right-8 flex items-center gap-3 text-[13px] text-neutral-400">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <div className="absolute top-8 right-8 flex items-center gap-2 text-[13px]">
      {user ? (
        <>
          <span className="text-neutral-500 truncate max-w-[140px]">{user.email}</span>
          <LogoutButton />
        </>
      ) : (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`${basePath}/login`}>{t("www.nav.login")}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`${basePath}/signup`}>{t("www.nav.signup")}</Link>
          </Button>
        </>
      )}
    </div>
  );
}
