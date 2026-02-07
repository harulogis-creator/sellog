/** 공개 사이트 기준 URL (OG, sitemap, canonical 등) */
export function getBaseUrl(): string {
  return (
    process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sellog.com")
  );
}
