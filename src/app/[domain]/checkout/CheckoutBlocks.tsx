"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";

export function CheckoutMessageBlock({
  variant,
  domain,
}: {
  variant: "selectProduct" | "productNotFound";
  domain: string;
}) {
  const { t } = useLocale();
  const messageKey = variant === "selectProduct" ? "blog.checkout.selectProduct" : "blog.checkout.productNotFound";
  return (
    <div className="max-w-md mx-auto px-6 sm:px-8 py-10 sm:py-12">
      <p className="text-neutral-600 mb-6">{t(messageKey)}</p>
      <Link href={`/${domain}`} className="text-neutral-900 font-medium underline">
        {t("blog.checkout.backToBlog")}
      </Link>
    </div>
  );
}

export function CheckoutOrderHeading() {
  const { t } = useLocale();
  return (
    <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-6">
      {t("blog.checkout.orderTitle")}
    </h2>
  );
}

export function CheckoutCancelBlock({ domain }: { domain: string }) {
  const { t } = useLocale();
  return (
    <div className="max-w-md mx-auto px-6 sm:px-8 py-10 sm:py-12 text-center space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">{t("blog.checkout.cancelTitle")}</h2>
      <p className="text-neutral-600">{t("blog.checkout.cancelDesc")}</p>
      <Button asChild>
        <Link href={`/${domain}`}>{t("blog.checkout.backToBlog")}</Link>
      </Button>
    </div>
  );
}

export function CheckoutFailBlock({
  domain,
  productId,
  reason,
}: {
  domain: string;
  productId?: string;
  reason?: string;
}) {
  const { t } = useLocale();
  const retryHref = productId ? `/${domain}/checkout?product=${productId}` : `/${domain}`;

  let desc: string;
  if (reason === "cancelled") {
    desc = t("blog.checkout.failReasonCancelled");
  } else if (reason) {
    try {
      desc = t("blog.checkout.failReasonWithReason").replace("{{reason}}", decodeURIComponent(reason));
    } catch {
      desc = t("blog.checkout.failReasonError");
    }
  } else {
    desc = t("blog.checkout.failReasonError");
  }

  return (
    <div className="max-w-md mx-auto px-6 sm:px-8 py-10 sm:py-12 text-center space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">{t("blog.checkout.failTitle")}</h2>
      <p className="text-neutral-600">{desc}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {productId && (
          <Button asChild>
            <Link href={retryHref}>{t("blog.checkout.failRetry")}</Link>
          </Button>
        )}
        <Button variant="outline" asChild>
          <Link href={`/${domain}`}>{t("blog.checkout.backToBlog")}</Link>
        </Button>
      </div>
    </div>
  );
}

export function CheckoutSuccessBlock({ domain, orderId }: { domain: string; orderId?: string }) {
  const { t } = useLocale();
  const desc = orderId
    ? t("blog.checkout.successOrderId").replace("{{id}}", orderId.slice(0, 8))
    : t("blog.checkout.successNoPayment");

  return (
    <div className="max-w-md mx-auto px-6 sm:px-8 py-10 sm:py-12 text-center space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">{t("blog.checkout.successTitle")}</h2>
      <p className="text-neutral-600">{desc}</p>
      <Button asChild>
        <Link href={`/${domain}`}>{t("blog.checkout.backToBlog")}</Link>
      </Button>
    </div>
  );
}
