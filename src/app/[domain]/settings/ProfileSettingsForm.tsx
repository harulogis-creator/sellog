"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { updateProfileAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileSettingsFormProps {
  initialDisplayName: string | null;
  initialAvatarUrl: string | null;
}

export function ProfileSettingsForm({
  initialDisplayName,
  initialAvatarUrl,
}: ProfileSettingsFormProps) {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await updateProfileAction(formData);
    setLoading(false);
    if (result?.error) setError(result.error);
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl">
      <div className="space-y-2">
        <Label htmlFor="profile_display_name" className="text-neutral-700">
          {t("blog.settings.profile.displayNameLabel")}
        </Label>
        <Input
          id="profile_display_name"
          name="display_name"
          defaultValue={initialDisplayName ?? ""}
          placeholder={t("blog.settings.profile.displayNamePlaceholder")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile_avatar_url" className="text-neutral-700">
          {t("blog.settings.profile.avatarUrlLabel")}
        </Label>
        <Input
          id="profile_avatar_url"
          name="avatar_url"
          type="url"
          defaultValue={initialAvatarUrl ?? ""}
          placeholder={t("blog.settings.profile.avatarUrlPlaceholder")}
        />
      </div>
      {error && <p className="text-sm text-red-600">{t(error)}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? t("blog.settings.profile.savingButton") : t("blog.settings.profile.saveButton")}
      </Button>
    </form>
  );
}
