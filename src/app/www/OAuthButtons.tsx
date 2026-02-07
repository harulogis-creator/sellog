"use client";

import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/LocaleProvider";

type Provider = "github" | "google";

const PROVIDER_KEYS = ["continueGitHub", "continueGoogle"] as const;

interface OAuthButtonsProps {
  /** 로그인 vs 회원가입 문구 구분용 (같은 컴포넌트 사용) */
  mode?: "login" | "signup";
}

/**
 * OAuth 로그인/회원가입 버튼.
 * Supabase Dashboard → Authentication → Providers 에서 해당 Provider를 활성화해야 동작합니다.
 */
export function OAuthButtons({ mode = "login" }: OAuthButtonsProps) {
  const params = useParams();
  const locale = (params?.domain as string) ?? "ko";
  const t = useTranslations();

  async function handleOAuth(provider: Provider) {
    const supabase = createClient();
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const next = `/${locale}/www`;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      window.location.href = `/${locale}/www/login?error=unknown`;
      return;
    }
    if (data?.url) {
      window.location.href = data.url;
    }
  }

  const orLabel = mode === "login" ? t("www.auth.orSocialLogin") : t("www.auth.orSocialSignup");
  const providers: { id: Provider; key: (typeof PROVIDER_KEYS)[number] }[] = [
    { id: "github", key: "continueGitHub" },
    { id: "google", key: "continueGoogle" },
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-neutral-500">
            {orLabel}
          </span>
        </div>
      </div>
      <div className="grid gap-3">
        {providers.map(({ id, key }) => (
          <Button
            key={id}
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => handleOAuth(id)}
          >
            {t(`www.auth.${key}`)}
          </Button>
        ))}
      </div>
    </div>
  );
}
