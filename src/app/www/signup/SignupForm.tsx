"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { signupAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/components/LocaleProvider";
import { OAuthButtons } from "../OAuthButtons";

export function SignupForm() {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const router = useRouter();
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signupAction(formData);
    setLoading(false);
    if (result?.error) {
      const key = `www.auth.errors.${result.error}`;
      const msg = t(key);
      setError(msg === key ? result.error : msg);
      return;
    }
    router.push(`/${locale}/www`);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form action={handleSubmit} className="space-y-6">
        <input type="hidden" name="locale" value={locale} />
        <div className="space-y-2">
          <Label htmlFor="email" className="text-neutral-700">{t("common.form.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-neutral-700">{t("common.form.passwordMin")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? t("www.auth.signingUp") : t("www.auth.signUp")}
        </Button>
      </form>
      <OAuthButtons mode="signup" />
    </div>
  );
}
