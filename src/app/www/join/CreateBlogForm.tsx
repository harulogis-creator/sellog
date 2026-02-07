"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "@/components/LocaleProvider";
import { createBlogAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const KNOWN_JOIN_ERROR_KEYS = [
  "env_missing",
  "login_required",
  "subdomain_name_required",
  "subdomain_format",
  "subdomain_min_length",
  "subdomain_taken",
  "unknown",
] as const;

export function CreateBlogForm() {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const router = useRouter();
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createBlogAction(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    if (result?.subdomain) router.push(`/${result.subdomain}`);
    else router.push(`/${locale}/www`);
  }

  const errorMessage =
    error &&
    (KNOWN_JOIN_ERROR_KEYS.includes(error as (typeof KNOWN_JOIN_ERROR_KEYS)[number])
      ? t(`www.join.errors.${error}`)
      : t("www.join.errors.unknown"));

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="subdomain" className="text-neutral-700">
          {t("www.join.subdomain")}
        </Label>
        <Input
          id="subdomain"
          name="subdomain"
          required
          pattern="[a-z0-9-]+"
          title={t("www.join.subdomainTitle")}
          placeholder={t("www.join.subdomainPlaceholder")}
        />
        <p className="text-xs text-neutral-500">{t("www.join.addressHint")}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-neutral-700">
          {t("www.join.name")}
        </Label>
        <Input id="name" name="name" required placeholder={t("www.join.namePlaceholder")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-neutral-700">
          {t("www.join.description")}
        </Label>
        <Input id="description" name="description" placeholder={t("www.join.descriptionPlaceholder")} />
      </div>
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? t("www.join.creating") : t("www.join.create")}
      </Button>
    </form>
  );
}
