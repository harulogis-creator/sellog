"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLocale } from "@/components/LocaleProvider";
import { deleteProductAction } from "./actions";
import { Button } from "@/components/ui/button";

interface ProductDeleteButtonProps {
  productId: string;
  productName: string;
  domain: string;
}

export function ProductDeleteButton({
  productId,
  productName,
  domain,
}: ProductDeleteButtonProps) {
  const { t } = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    const message = t("blog.delete.productConfirm").replace("{{name}}", productName);
    const ok = window.confirm(message);
    if (!ok) return;
    setLoading(true);
    const result = await deleteProductAction(productId, domain);
    setLoading(false);
    if (result?.error) {
      toast.error(t(result.error));
      return;
    }
    router.refresh();
  }

  const ariaLabel = loading
    ? t("blog.delete.deletingAria")
    : t("blog.delete.productAria").replace("{{name}}", productName);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={loading}
      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
      aria-label={ariaLabel}
    >
      {loading ? t("blog.delete.deleting") : t("blog.delete.delete")}
    </Button>
  );
}
