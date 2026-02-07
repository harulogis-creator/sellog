import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { LocaleProvider } from "@/components/LocaleProvider";
import { SkipToContentLink } from "@/components/SkipToContentLink";
import "./globals.css";

const baseUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sellog.com");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Sellog",
  description: "검색엔진에 최적화된 블로그 커머스 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;var m=window.matchMedia('(prefers-color-scheme: dark)');function set(){d.classList.toggle('dark',m.matches);}set();m.addEventListener('change',set);})();`,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <LocaleProvider>
          <SkipToContentLink />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <Toaster position="top-center" richColors closeButton />
        <Analytics />
        </LocaleProvider>
      </body>
    </html>
  );
}
