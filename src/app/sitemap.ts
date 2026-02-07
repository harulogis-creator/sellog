import { supabase } from "@/lib/supabase";
import { LOCALES } from "@/lib/i18n";
import type { MetadataRoute } from "next";

const baseUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sellog.com");

const WWW_SUBPATHS = [
  { path: "", priority: 0.95, changeFrequency: "daily" as const },
  { path: "join", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "login", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "signup", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "check", priority: 0.7, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  ];

  for (const locale of LOCALES) {
    for (const { path, priority, changeFrequency } of WWW_SUBPATHS) {
      const pathSegment = path ? `/${path}` : "";
      entries.push({
        url: `${baseUrl}/${locale}/www${pathSegment}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    }
  }

  if (!supabase) return entries;
  try {
    const rootHost = baseUrl.replace(/^https?:\/\//, "").replace(/^www\./, "");
    const { data: blogs } = await supabase.from("blogs").select("id, subdomain");
    if (!blogs?.length) return entries;

    for (const blog of blogs) {
      const subdomain = blog.subdomain;
      const blogUrl = `https://${subdomain}.${rootHost}`;
      entries.push({
        url: blogUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      });

      const { data: posts } = await supabase
        .from("posts")
        .select("slug, updated_at")
        .eq("blog_id", blog.id)
        .not("published_at", "is", null);

      if (posts?.length) {
        for (const post of posts) {
          entries.push({
            url: `${blogUrl}/post/${post.slug}`,
            lastModified: new Date(post.updated_at ?? ""),
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    }
  } catch {
    // Supabase 미설정 시 루트만
  }

  return entries;
}
