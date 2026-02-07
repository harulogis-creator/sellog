"use client";

import {
  FileText,
  Package,
  Search,
  Globe,
  CreditCard,
  LayoutDashboard,
  PenLine,
} from "lucide-react";
import { useTranslations } from "@/components/LocaleProvider";

const ITEMS: { icon: typeof FileText; labelKey: string }[] = [
  { icon: FileText, labelKey: "www.allInOne.blog" },
  { icon: Package, labelKey: "www.allInOne.product" },
  { icon: Search, labelKey: "www.allInOne.seo" },
  { icon: Globe, labelKey: "www.allInOne.domain" },
  { icon: CreditCard, labelKey: "www.allInOne.payment" },
  { icon: LayoutDashboard, labelKey: "www.allInOne.settings" },
  { icon: PenLine, labelKey: "www.allInOne.writing" },
  { icon: Package, labelKey: "www.allInOne.orders" },
];

/** 올인원 그리드 8칸 (i18n) */
export function WwwAllInOneSection() {
  const t = useTranslations();

  return (
    <section className="border-t border-neutral-200 bg-neutral-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl text-center">
          {t("www.allInOne.title")}
        </h2>
        <p className="mt-3 text-center text-neutral-600 max-w-xl mx-auto text-sm">
          {t("www.allInOne.subtitle")}
        </p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ITEMS.map(({ icon: Icon, labelKey }) => (
            <div
              key={labelKey}
              className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-6 text-center hover:shadow-md transition-shadow"
            >
              <Icon className="h-8 w-8 text-neutral-700 mb-2" />
              <span className="text-sm font-medium text-neutral-900">{t(labelKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
