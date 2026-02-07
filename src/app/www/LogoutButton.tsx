"use client";

import { useTranslations } from "@/components/LocaleProvider";
import { logoutAction } from "./logout/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const t = useTranslations();
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="outline" size="sm">
        {t("www.nav.logout")}
      </Button>
    </form>
  );
}
