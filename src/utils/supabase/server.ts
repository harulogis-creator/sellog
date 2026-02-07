import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버 컴포넌트 / Server Actions / Route Handlers에서 사용할 Supabase 클라이언트
 * (서버에서만 실행되며, 쿠키에서 세션 읽기)
 * env 누락 시 인증 없는 mock 반환 → 예외로 인한 "missing required error components" 방지
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const mock = {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    },
    from: () =>
      ({
        select: () => ({ single: () => ({ data: null, error: null }), limit: () => ({ data: [], error: null }) }),
        insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }), error: null }),
        update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }), error: null }),
        delete: () => ({ eq: () => ({ error: null }), error: null }),
      }) as ReturnType<ReturnType<typeof createServerClient>["from"]>,
  } as Awaited<ReturnType<typeof createServerClient>>;

  if (!url || !key) return mock;

  try {
    const cookieStore = await cookies();
    return createServerClient(
      url,
      key,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Server Component에서는 set이 무시될 수 있음 (middleware에서 처리)
            }
          },
        },
      }
    );
  } catch {
    // cookies() 또는 createServerClient 예외 시 mock 반환 (missing required error components 방지)
    return mock;
  }
}
