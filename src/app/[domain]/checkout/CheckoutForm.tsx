"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLocale } from "@/components/LocaleProvider";
import { createOrderAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutFormProps {
  domain: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImageUrl: string | null;
}

export function CheckoutForm({
  domain,
  productId,
  productName,
  productPrice,
  productImageUrl,
}: CheckoutFormProps) {
  const router = useRouter();
  const { t, locale } = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const priceLocale = locale === "ko" ? "ko-KR" : "en-US";
  const currencySuffix = t("blog.products.currencySuffix");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim() || undefined;
    setLoading(true);
    setError(null);
    const result = await createOrderAction(domain, productId, quantity, email);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
      toast.error(t(result.error));
      return;
    }
    if (result?.orderId) {
      router.push(`/${domain}/checkout/success?order=${result.orderId}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-100">
        {productImageUrl ? (
          <img
            src={productImageUrl}
            alt=""
            className="h-20 w-20 rounded-xl object-cover shrink-0"
          />
        ) : (
          <div className="h-20 w-20 rounded-xl bg-neutral-100 shrink-0" />
        )}
        <div className="min-w-0">
          <p className="font-semibold text-neutral-900">{productName}</p>
          <p className="text-lg font-semibold text-neutral-700 mt-1">
            {productPrice.toLocaleString(priceLocale)}{currencySuffix}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-neutral-700">{t("blog.checkout.form.quantity")}</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-neutral-700">{t("blog.checkout.form.emailLabel")}</Label>
        <Input id="email" name="email" type="email" placeholder={t("blog.checkout.form.emailPlaceholder")} />
      </div>

      {error && <p className="text-sm text-red-600">{t(error)}</p>}

      <p className="text-xs text-neutral-500">
        {t("blog.checkout.form.notice")}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit" disabled={loading} className="flex-1" size="lg">
          {loading ? t("blog.checkout.form.submitting") : t("blog.checkout.form.submit")}
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href={`/${domain}/checkout/cancel`}>{t("blog.checkout.form.cancel")}</Link>
        </Button>
      </div>
    </form>
  );
}
