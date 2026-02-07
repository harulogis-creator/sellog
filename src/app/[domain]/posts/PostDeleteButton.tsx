"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useLocale } from "@/components/LocaleProvider";
import { deletePostAction } from "./actions";
import { Button } from "@/components/ui/button";

interface PostDeleteButtonProps {
  postId: string;
  title: string;
  domain: string;
}

export function PostDeleteButton({
  postId,
  title,
  domain,
}: PostDeleteButtonProps) {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    const message = t("blog.delete.postConfirm").replace("{{title}}", title);
    const ok = window.confirm(message);
    if (!ok) return;
    setLoading(true);
    const result = await deletePostAction(postId, domain);
    setLoading(false);
    if (result?.error) {
      toast.error(t(result.error));
      return;
    }
  }

  const ariaLabel = loading
    ? t("blog.delete.deletingAria")
    : t("blog.delete.postAria").replace("{{title}}", title);

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
