import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * OAuth 콜백: Provider가 code를 쿼리로 보내면 세션으로 교환 후 리다이렉트.
 * Supabase Dashboard → Authentication → URL Configuration 에서
 * Redirect URLs에 https://your-domain.com/auth/callback 추가 필요.
 */
/** next 쿼리가 같은 출처 경로인지 검사 (오픈 리다이렉트 방지) */
function isSafeNext(next: string): boolean {
  const trimmed = next.trim();
  return trimmed.startsWith("/") && !trimmed.startsWith("//");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/www";
  const next = isSafeNext(nextParam) ? nextParam : "/ko/www";

  const loginErrorUrl = "/ko/www/login"; // [domain]/www/login 구조에 맞춤
  if (!code) {
    return NextResponse.redirect(
      new URL(`${loginErrorUrl}?error=no_code`, request.url)
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(
      new URL(`${loginErrorUrl}?error=config`, request.url)
    );
  }

  const response = NextResponse.redirect(new URL(next, request.url));
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(`${loginErrorUrl}?error=unknown`, request.url)
    );
  }

  return response;
}
