"use client";

import {
  Search,
  FileText,
  Globe,
  CreditCard,
  PenLine,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/components/LocaleProvider";
import { FeatureGreatFor } from "./FeatureGreatFor";

type FeatureItem = { icon: LucideIcon; greatForKey: string };

const CARD_KEY_MAP: Record<string, { title: string; desc: string }> = {
  seo: { title: "www.featuresCard.titleSeo", desc: "www.featuresCard.descSeo" },
  blogCommerce: { title: "www.featuresCard.titleBlogCommerce", desc: "www.featuresCard.descBlogCommerce" },
  domain: { title: "www.featuresCard.titleDomain", desc: "www.featuresCard.descDomain" },
  payment: { title: "www.featuresCard.titlePayment", desc: "www.featuresCard.descPayment" },
  editor: { title: "www.featuresCard.titleEditor", desc: "www.featuresCard.descEditor" },
  dashboard: { title: "www.featuresCard.titleDashboard", desc: "www.featuresCard.descDashboard" },
};

/** 기능 6카드 (제목·부제·카드 제목·설명 i18n) */
export function WwwFeaturesSection({ features }: { features: FeatureItem[] }) {
  const t = useTranslations();

  return (
    <section id="features" className="border-t border-neutral-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl text-center">
          {t("www.featuresSection.title")}
        </h2>
        <p className="mt-4 text-center text-neutral-600 max-w-2xl mx-auto">
          {t("www.featuresSection.subtitle")}
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, greatForKey }) => {
            const keys = CARD_KEY_MAP[greatForKey];
            if (!keys) return null;
            return (
              <div
                key={greatForKey}
                className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">{t(keys.title)}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{t(keys.desc)}</p>
                <FeatureGreatFor featureKey={greatForKey} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
