import { createBrowserClient } from "@supabase/ssr";

/**
 * 클라이언트 컴포넌트에서 사용할 Supabase 클라이언트
 * (브라우저에서 실행되며, 쿠키 기반 세션 사용)
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
