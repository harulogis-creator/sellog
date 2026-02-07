import type { Metadata } from "next";
import {
  Search,
  FileText,
  Globe,
  CreditCard,
  LayoutDashboard,
  PenLine,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { getBaseUrl } from "@/lib/site";
import { isValidLocale } from "@/lib/i18n";
import ko from "@/messages/ko.json";
import en from "@/messages/en.json";
import { WwwHero } from "@/app/www/WwwHero";
import { WwwHowToStart } from "@/app/www/WwwHowToStart";
import { WwwShowcaseSection } from "@/app/www/WwwShowcaseSection";
import { WwwTestimonialSection } from "@/app/www/WwwTestimonialSection";
import { WwwProofSection } from "@/app/www/WwwProofSection";
import { WwwAllInOneSection } from "@/app/www/WwwAllInOneSection";
import { WwwFeaturesSection } from "@/app/www/WwwFeaturesSection";
import { WwwFaqSection } from "@/app/www/WwwFaqSection";
import { WwwSupportBlock } from "@/app/www/WwwSupportBlock";
import { WwwPricingSection } from "@/app/www/WwwPricingSection";
import { WwwFinalCtaSection } from "@/app/www/WwwFinalCtaSection";

const messages = {
  ko: ko as { www: { meta: { title: string; description: string; ogDescription: string } } },
  en: en as { www: { meta: { title: string; description: string; ogDescription: string } } },
};

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata> {
  const locale = isValidLocale(params.domain) ? params.domain : "ko";
  const meta = messages[locale].www.meta;
  const base = getBaseUrl();
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${base}/${locale}/www`,
      languages: { ko: `${base}/ko/www`, en: `${base}/en/www` },
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: `${base}/${locale}/www`,
    },
  };
}

export default async function WwwPage() {
  let myBlog: { subdomain: string; name: string } | null = null;
  let publicBlogs: { subdomain: string; name: string }[] = [];
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data } = await supabase
      .from("blogs")
      .select("subdomain, name")
      .eq("owner_id", user.id)
      .limit(1)
      .single();
    if (data) myBlog = data;
  }
  const { data: blogs } = await supabase
    .from("blogs")
    .select("subdomain, name")
    .limit(6);
  if (blogs?.length) publicBlogs = blogs;

  const features = [
    { icon: Search, greatForKey: "seo" },
    { icon: FileText, greatForKey: "blogCommerce" },
    { icon: Globe, greatForKey: "domain" },
    { icon: CreditCard, greatForKey: "payment" },
    { icon: PenLine, greatForKey: "editor" },
    { icon: LayoutDashboard, greatForKey: "dashboard" },
  ];

  return (
    <>
      <WwwHero myBlog={myBlog} />
      <WwwProofSection />
      <WwwAllInOneSection />
      <WwwFeaturesSection features={features} />
      <WwwHowToStart />
      <WwwShowcaseSection publicBlogs={publicBlogs} />
      <WwwTestimonialSection />
      <WwwFaqSection />
      <WwwSupportBlock />
      <WwwPricingSection />
      <WwwFinalCtaSection />
    </>
  );
}
