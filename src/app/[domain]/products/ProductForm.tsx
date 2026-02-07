"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "@/components/LocaleProvider";
import { createProductAction } from "./actions";
import { suggestWithAi } from "@/app/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductFormProps {
  blogId: string;
  domain: string;
}

export function ProductForm({ blogId, domain }: ProductFormProps) {
  const router = useRouter();
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [altResult, setAltResult] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  function getProductContext() {
    const name = nameRef.current?.value?.trim() ?? "";
    const price = priceRef.current?.value?.trim() ?? "";
    return [name, price].filter(Boolean).join(", ");
  }

  async function handleAiName() {
    setAiError(null);
    setAiLoading(true);
    const res = await suggestWithAi("product_name", getProductContext() || t("blog.products.form.defaultContext"));
    setAiLoading(false);
    if (res.error) {
      setAiError(res.error);
      toast.error(t(res.error));
      return;
    }
    if (res.text && nameRef.current) {
      nameRef.current.value = res.text;
      nameRef.current.focus();
      toast.success(t("blog.products.form.toastNameFilled"));
    }
  }

  async function handleAiDescription() {
    setAiError(null);
    setAiLoading(true);
    const res = await suggestWithAi("product_description", getProductContext() || t("blog.products.form.defaultContext"));
    setAiLoading(false);
    if (res.error) {
      setAiError(res.error);
      toast.error(t(res.error));
      return;
    }
    if (res.text && descriptionRef.current) {
      descriptionRef.current.value = res.text;
      descriptionRef.current.focus();
      toast.success(t("blog.products.form.toastDescriptionFilled"));
    }
  }

  async function handleAiImageAlt() {
    setAiError(null);
    setAltResult(null);
    const name = nameRef.current?.value?.trim() ?? "";
    const desc = descriptionRef.current?.value?.trim() ?? "";
    const context = [name, desc].filter(Boolean).join("\n") || t("blog.products.form.defaultContext");
    setAiLoading(true);
    const res = await suggestWithAi("image_alt_product", context);
    setAiLoading(false);
    if (res.error) {
      setAiError(res.error);
      toast.error(t(res.error));
    } else if (res.text) setAltResult(res.text);
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    formData.set("blogId", blogId);
    formData.set("domain", domain);
    const result = await createProductAction(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
      toast.error(t(result.error));
      return;
    }
    toast.success(t("blog.products.form.toastAdded"));
    router.refresh();
  }

  return (
    <form
      action={handleSubmit}
      encType="multipart/form-data"
      className="space-y-6 p-6 sm:p-8 bg-white rounded-3xl border border-neutral-200/60 shadow-lg shadow-neutral-200/40"
    >
      <input type="hidden" name="blogId" value={blogId} />
      <input type="hidden" name="domain" value={domain} />
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Label htmlFor="name" className="text-neutral-700">{t("blog.products.form.nameLabel")}</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAiName}
            disabled={aiLoading}
            className="text-neutral-600"
          >
            <Sparkles className="h-4 w-4 mr-1 inline" aria-hidden />
            {aiLoading ? t("blog.products.form.aiGenerating") : t("blog.products.form.aiName")}
          </Button>
        </div>
        <Input ref={nameRef} id="name" name="name" required placeholder={t("blog.products.form.namePlaceholder")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price" className="text-neutral-700">{t("blog.products.form.priceLabel")}</Label>
        <Input ref={priceRef} id="price" name="price" type="number" min={0} required placeholder={t("blog.products.form.pricePlaceholder")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image_file" className="text-neutral-700">{t("blog.products.form.imageLabel")}</Label>
        <input
          id="image_file"
          name="image_file"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="w-full text-sm text-neutral-600 file:mr-3 file:rounded-full file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-700 hover:file:bg-neutral-200"
        />
        <p className="text-xs text-neutral-500">{t("blog.products.form.imageHint")}</p>
        <div className="pt-2">
          <Button type="button" variant="outline" size="sm" onClick={handleAiImageAlt} disabled={aiLoading}>
            <Sparkles className="h-4 w-4 mr-1 inline" aria-hidden />
            {t("blog.products.form.aiImageAlt")}
          </Button>
          {altResult && <p className="mt-2 text-sm text-neutral-800 rounded-lg bg-neutral-50 p-3 border border-neutral-200">{altResult}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Label htmlFor="description" className="text-neutral-700">{t("blog.products.form.descriptionLabel")}</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAiDescription}
            disabled={aiLoading}
            className="text-neutral-600"
          >
            <Sparkles className="h-4 w-4 mr-1 inline" aria-hidden />
            {aiLoading ? t("blog.products.form.aiGenerating") : t("blog.products.form.aiDescription")}
          </Button>
        </div>
        <textarea
          ref={descriptionRef}
          id="description"
          name="description"
          rows={2}
          className="w-full min-h-[80px] rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
          placeholder={t("blog.products.form.descriptionPlaceholder")}
        />
      </div>
      {aiError && <p className="text-sm text-red-600">{t(aiError)}</p>}
      {error && <p className="text-sm text-red-600">{t(error)}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? t("blog.products.form.addingButton") : t("blog.products.form.addButton")}
      </Button>
    </form>
  );
}
