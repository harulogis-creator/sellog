import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { LOCALE_COOKIE } from "@/lib/i18n";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "sellog.com";
const LOCALES = ["ko", "en"] as const;
type Locale = (typeof LOCALES)[number];

function getPreferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && LOCALES.includes(cookie as Locale)) return cookie as Locale;
  const accept = request.headers.get("accept-language") ?? "";
  const first = accept.split(",")[0]?.toLowerCase();
  if (first?.startsWith("en")) return "en";
  return "ko";
}

function redirectWithLocale(url: URL, locale: Locale): NextResponse {
  const res = NextResponse.redirect(url, 302);
  res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
  return res;
}

/**
 * 1) Supabase 세션 갱신 (Auth 쿠키)
 * 2) 서브도메인 / 커스텀 도메인 구분:
 *    - www.sellog.com 또는 sellog.com → 플랫폼 랜딩 (/www)
 *    - user.sellog.com → 해당 사용자 블로그 (/user)
 *    - 커스텀 도메인(blogs.custom_domain) → 해당 블로그 서브도메인으로 rewrite
 */
function copySetCookieHeaders(from: NextResponse, to: NextResponse) {
  from.headers.getSetCookie?.().forEach((cookie) => {
    to.headers.append("Set-Cookie", cookie);
  });
}

/** Supabase REST로 custom_domain에 해당하는 블로그의 subdomain 조회 (Edge용) */
async function getSubdomainByCustomDomain(hostname: string): Promise<string | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) return null;
  const encoded = encodeURIComponent(hostname);
  const res = await fetch(
    `${supabaseUrl}/rest/v1/blogs?custom_domain=eq.${encoded}&select=subdomain`,
    {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        Accept: "application/json",
      },
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) && data[0]?.subdomain ? data[0].subdomain : null;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // favicon 요청이 [domain]으로 매칭되어 500 나는 것 방지
  if (pathname === "/favicon.ico") {
    return new NextResponse(null, { status: 204 });
  }

  const sessionResponse = await updateSession(request);
  if (sessionResponse.status !== 200) return sessionResponse;

  const url = request.nextUrl.clone();
  const host = request.headers.get("host") ?? "";
  const hostname = host.replace(/:\d+$/, "");
  const isLocalhost = hostname.startsWith("localhost") || hostname.startsWith("127.0.0.1");
  const firstSegment = pathname.split("/")[1];

  // 경로 기반 locale: /www·/www/* → /[locale]/www(/*) 로 리다이렉트
  if (pathname === "/www" || pathname.startsWith("/www/")) {
    const locale = getPreferredLocale(request);
    const rest = pathname === "/www" ? "" : pathname.slice(4);
    url.pathname = `/${locale}/www${rest}`;
    const redir = redirectWithLocale(url, locale);
    copySetCookieHeaders(sessionResponse as NextResponse, redir);
    return redir;
  }

  if (pathname === "/") {
    const locale = getPreferredLocale(request);
    url.pathname = `/${locale}/www`;
    const redir = redirectWithLocale(url, locale);
    copySetCookieHeaders(sessionResponse as NextResponse, redir);
    return redir;
  }

  // /ko/*, /en/* 진입 시 쿠키 동기화
  if (firstSegment === "ko" || firstSegment === "en") {
    const locale = firstSegment as Locale;
    const res = NextResponse.next();
    copySetCookieHeaders(sessionResponse as NextResponse, res);
    res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
    return res;
  }

  if (firstSegment === "api") return sessionResponse;
  if (firstSegment && firstSegment !== "favicon.ico" && !firstSegment.startsWith("_")) {
    return sessionResponse;
  }

  let subdomain: string | null = null;
  if (isLocalhost) {
    const sub = request.headers.get("x-forwarded-host")?.split(".")[0] ?? null;
    if (sub && sub !== "www") subdomain = sub;
  } else {
    const parts = hostname.split(".");
    if (parts.length >= 2) {
      const possibleSub = parts[0];
      const baseDomain = parts.slice(-2).join(".");
      if (baseDomain === ROOT_DOMAIN && possibleSub !== "www") {
        subdomain = possibleSub;
      }
    }
    // 서브도메인으로 안 나왔으면 커스텀 도메인 여부 조회
    if (!subdomain) {
      subdomain = await getSubdomainByCustomDomain(hostname);
    }
  }

  if (subdomain) {
    url.pathname = `/${subdomain}${pathname === "/" ? "" : pathname}`;
    const rewriteRes = NextResponse.rewrite(url);
    copySetCookieHeaders(sessionResponse as NextResponse, rewriteRes);
    return rewriteRes;
  }

  return sessionResponse;
}

export const config = {
  matcher: [
    // favicon.ico 제외하지 않음 → 미들웨어에서 204 처리해 [domain] 500 방지
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
