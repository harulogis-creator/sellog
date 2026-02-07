"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { updateBlogAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BlogSettingsFormProps {
  domain: string;
  initialName: string;
  initialDescription: string | null;
  initialCustomDomain: string | null;
}

export function BlogSettingsForm({
  domain,
  initialName,
  initialDescription,
  initialCustomDomain,
}: BlogSettingsFormProps) {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await updateBlogAction(domain, formData);
    setLoading(false);
    if (result?.error) setError(result.error);
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-neutral-700">{t("blog.settings.nameLabel")}</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={initialName}
          placeholder={t("blog.settings.namePlaceholder")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-neutral-700">{t("blog.settings.descriptionLabel")}</Label>
        <Input
          id="description"
          name="description"
          defaultValue={initialDescription ?? ""}
          placeholder={t("blog.settings.descriptionPlaceholder")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="custom_domain" className="text-neutral-700">{t("blog.settings.customDomainLabel")}</Label>
        <Input
          id="custom_domain"
          name="custom_domain"
          type="text"
          defaultValue={initialCustomDomain ?? ""}
          placeholder={t("blog.settings.customDomainPlaceholder")}
        />
        <p className="text-xs text-neutral-500">
          {t("blog.settings.customDomainHelp")}
        </p>
      </div>
      <p className="text-xs text-neutral-500">
        {t("blog.settings.subdomainNotice").replace("{{domain}}", domain)}
      </p>
      {error && <p className="text-sm text-red-600">{t(error)}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? t("blog.settings.saving") : t("blog.settings.save")}
      </Button>
    </form>
  );
}
