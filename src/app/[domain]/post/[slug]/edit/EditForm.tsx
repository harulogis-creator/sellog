"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "@/components/LocaleProvider";
import { updatePostAction, deletePostAction } from "./actions";
import { suggestWithAi } from "@/app/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostBody } from "@/components/PostBody";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
  description?: string | null;
}

interface EditFormProps {
  postId: string;
  blogId: string;
  domain: string;
  initialTitle: string;
  initialSlug: string;
  initialBodyMd: string;
  initialMetaDescription?: string;
  initialThumbnailUrl?: string;
  initialPublished: boolean;
  products?: ProductItem[];
}

export function EditForm({
  postId,
  blogId,
  domain,
  initialTitle,
  initialSlug,
  initialBodyMd,
  initialMetaDescription = "",
  initialThumbnailUrl = "",
  initialPublished,
  products = [],
}: EditFormProps) {
  const { t, locale } = useLocale();
  const priceLocale = locale === "ko" ? "ko-KR" : "en-US";
  const currencySuffix = t("blog.products.currencySuffix");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bodyMd, setBodyMd] = useState(initialBodyMd);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [summaryResult, setSummaryResult] = useState<string | null>(null);
  const [altResult, setAltResult] = useState<string | null>(null);
  const [socialResult, setSocialResult] = useState<string | null>(null);
  const [summaryEnResult, setSummaryEnResult] = useState<string | null>(null);
  const [metaDescLen, setMetaDescLen] = useState(initialMetaDescription?.length ?? 0);
  const bodyMdRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const metaDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const nextCursorRef = useRef<number | null>(null);

  function slugify(s: string): string {
    return s
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const productsById = useMemo(() => {
    const m = new Map<string, { id: string; name: string; price: number; image_url: string | null; description: string | null }>();
    products.forEach((p) => m.set(p.id.toLowerCase(), { id: p.id, name: p.name, price: p.price, image_url: p.image_url ?? null, description: p.description ?? null }));
    return m;
  }, [products]);

  useEffect(() => {
    if (nextCursorRef.current !== null && bodyMdRef.current) {
      bodyMdRef.current.selectionStart = bodyMdRef.current.selectionEnd = nextCursorRef.current;
      bodyMdRef.current.focus();
      nextCursorRef.current = null;
    }
  }, [bodyMd]);

  function insertProduct(productId: string) {
    const ta = bodyMdRef.current;
    const start = ta?.selectionStart ?? bodyMd.length;
    const end = ta?.selectionEnd ?? bodyMd.length;
    const inserted = `[product:${productId}]`;
    setBodyMd((prev) => prev.slice(0, start) + inserted + prev.slice(end));
    nextCursorRef.current = start + inserted.length;
    setShowProductPicker(false);
  }

  async function handleSubmit(formData: FormData) {
    formData.set("postId", postId);
    formData.set("blogId", blogId);
    formData.set("domain", domain);
    formData.set("body_md", bodyMd);
    setLoading(true);
    setError(null);
    const result = await updatePostAction(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
      toast.error(t(result.error));
    }
  }

  async function handleDelete() {
    const ok = window.confirm(t("blog.editPost.deleteConfirm"));
    if (!ok) return;
    setLoading(true);
    setError(null);
    const result = await deletePostAction(postId, domain);
    if (result?.error) {
      toast.error(t(result.error));
      setLoading(false);
      return;
    }
  }

  async function handleAiTitle() {
    setAiError(null);
    setAiLoading(true);
    const res = await suggestWithAi("post_title", bodyMd);
    setAiLoading(false);
    if (res.error) {
      setAiError(res.error);
      toast.error(t(res.error));
      return;
    }
    if (res.text && titleRef.current) {
      titleRef.current.value = res.text;
      titleRef.current.focus();
      toast.success(t("blog.editor.toastTitleFilled"));
    }
  }

  async function handleAiSummary() {
    setAiError(null);
    setSummaryResult(null);
    setAiLoading(true);
    const res = await suggestWithAi("post_summary", bodyMd);
    setAiLoading(false);
    if (res.error) {
      setAiError(res.error);
      toast.error(t(res.error));
      return;
    }
    if (res.text) {
      setSummaryResult(res.text);
      if (metaDescriptionRef.current) metaDescriptionRef.current.value = res.text;
      setMetaDescLen(res.text.length);
      toast.success(t("blog.editor.toastSummaryDone"));
    }
  }

  async function handleAiSlug() {
    setAiError(null);
    const title = titleRef.current?.value?.trim() ?? "";
    const context = title ? `${title}\n\n${bodyMd.slice(0, 300)}` : bodyMd.slice(0, 500);
    setAiLoading(true);
    const res = await suggestWithAi("post_slug", context);
    setAiLoading(false);
    if (res.error) {
      setAiError(res.error);
      toast.error(t(res.error));
      return;
    }
    if (res.text && slugRef.current) {
      slugRef.current.value = slugify(res.text);
      slugRef.current.focus();
      toast.success(t("blog.editor.toastSlugFilled"));
    }
  }

  async function handleAiAlt() {
    setAiError(null);
    setAltResult(null);
    const title = titleRef.current?.value?.trim() ?? "";
    const context = title ? `${title}\n\n${bodyMd.slice(0, 500)}` : bodyMd.slice(0, 600);
    setAiLoading(true);
    const res = await suggestWithAi("image_alt_post", context);
    setAiLoading(false);
    if (res.error) {
      setAiError(res.error);
      toast.error(t(res.error));
    } else if (res.text) setAltResult(res.text);
  }

  async function handleAiSocialCaption() {
    setAiError(null);
    setSocialResult(null);
    const title = titleRef.current?.value?.trim() ?? "";
    const context = title ? `${title}\n\n${bodyMd.slice(0, 800)}` : bodyMd.slice(0, 1000);
    setAiLoading(true);
    const res = await suggestWithAi("social_caption", context);
    setAiLoading(false);
    if (res.error) {
      setAiError(res.error);
      toast.error(t(res.error));
    } else if (res.text) setSocialResult(res.text);
  }

  async function handleAiSummaryEn() {
    setAiError(null);
    setSummaryEnResult(null);
    setAiLoading(true);
    const res = await suggestWithAi("post_summary_en", bodyMd);
    setAiLoading(false);
    if (res.error) {
      setAiError(res.error);
      toast.error(t(res.error));
    } else if (res.text) setSummaryEnResult(res.text);
  }

  return (
    <div className="space-y-10">
      <form action={handleSubmit} className="space-y-6">
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="blogId" value={blogId} />
        <input type="hidden" name="domain" value={domain} />
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Label htmlFor="title" className="text-neutral-700">{t("blog.editor.titleLabel")}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAiTitle}
              disabled={aiLoading}
              className="text-neutral-600"
            >
              <Sparkles className="h-4 w-4 mr-1 inline" aria-hidden />
              {aiLoading ? t("blog.editor.aiGenerating") : t("blog.editor.aiTitle")}
            </Button>
          </div>
          <Input ref={titleRef} id="title" name="title" required defaultValue={initialTitle} placeholder={t("blog.editor.titlePlaceholder")} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAiSummary}
            disabled={aiLoading}
          >
            <Sparkles className="h-4 w-4 mr-1" aria-hidden />
            AI 요약 생성 (메타용)
          </Button>
        </div>
        {(aiError || summaryResult) && (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-4 space-y-2">
            {aiError && <p className="text-sm text-red-600">{t(aiError)}</p>}
            {summaryResult && (
              <>
                <p className="text-xs font-medium text-neutral-500">{t("blog.editor.metaResultLabel")}</p>
                <p className="text-sm text-neutral-800">{summaryResult}</p>
              </>
            )}
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Label htmlFor="slug" className="text-neutral-700">{t("blog.editor.slugLabel")}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAiSlug}
              disabled={aiLoading}
              className="text-neutral-600"
            >
              <Sparkles className="h-4 w-4 mr-1 inline" aria-hidden />
              {aiLoading ? t("blog.editor.aiGenerating") : t("blog.editor.aiSlug")}
            </Button>
          </div>
          <Input ref={slugRef} id="slug" name="slug" required defaultValue={initialSlug} placeholder={t("blog.editor.slugPlaceholder")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="meta_description" className="text-neutral-700">{t("blog.editor.metaLabel")}</Label>
          <textarea
            ref={metaDescriptionRef}
            id="meta_description"
            name="meta_description"
            rows={2}
            maxLength={200}
            defaultValue={initialMetaDescription}
            onChange={(e) => setMetaDescLen(e.target.value.length)}
            className="w-full min-h-[60px] rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all"
            placeholder={t("blog.editor.metaPlaceholder")}
          />
          <p className="text-xs text-neutral-500">
            {t("blog.editor.metaHintChars").replace("{{count}}", String(metaDescLen))}
            {metaDescLen > 160 && (
              <span className="text-amber-600 dark:text-amber-400 ml-1">{t("blog.editor.metaHintRecommended")}</span>
            )}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="thumbnail_url" className="text-neutral-700">{t("blog.editor.thumbnailLabel")}</Label>
          <Input id="thumbnail_url" name="thumbnail_url" type="url" defaultValue={initialThumbnailUrl} placeholder={t("blog.editor.thumbnailPlaceholder")} />
        </div>
        <details className="rounded-2xl border border-neutral-200 bg-neutral-50/50 overflow-hidden">
          <summary className="px-4 py-3 cursor-pointer list-none flex items-center gap-2 font-medium text-neutral-700 hover:bg-neutral-100/80 [&::-webkit-details-marker]:hidden">
            <Sparkles className="h-4 w-4 text-amber-500" aria-hidden />
            {t("blog.editor.aiHelperSummary")}
          </summary>
          <div className="px-4 pb-4 pt-1 space-y-4 border-t border-neutral-200/80">
            <div>
              <Button type="button" variant="outline" size="sm" onClick={handleAiAlt} disabled={aiLoading}>
                <Sparkles className="h-4 w-4 mr-1 inline" aria-hidden />
                {t("blog.editor.aiAlt")}
              </Button>
              {altResult && <p className="mt-2 text-sm text-neutral-800 rounded-lg bg-white p-3 border border-neutral-200">{altResult}</p>}
            </div>
            <div>
              <Button type="button" variant="outline" size="sm" onClick={handleAiSocialCaption} disabled={aiLoading}>
                <Sparkles className="h-4 w-4 mr-1 inline" aria-hidden />
                {t("blog.editor.aiSocial")}
              </Button>
              {socialResult && <p className="mt-2 text-sm text-neutral-800 rounded-lg bg-white p-3 border border-neutral-200">{socialResult}</p>}
            </div>
            <div>
              <Button type="button" variant="outline" size="sm" onClick={handleAiSummaryEn} disabled={aiLoading}>
                <Sparkles className="h-4 w-4 mr-1 inline" aria-hidden />
                {t("blog.editor.aiSummaryEn")}
              </Button>
              {summaryEnResult && <p className="mt-2 text-sm text-neutral-800 rounded-lg bg-white p-3 border border-neutral-200">{summaryEnResult}</p>}
            </div>
          </div>
        </details>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Label htmlFor="body_md" className="text-neutral-700">{t("blog.editor.bodyLabel")}</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowPreview((v) => !v)}>
                {showPreview ? t("blog.editor.editTab") : t("blog.editor.previewTab")}
              </Button>
              {products.length > 0 && (
                <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowProductPicker((v) => !v)}
                  className="shrink-0"
                >
                  {t("blog.editor.insertProduct")}
                </Button>
                {showProductPicker && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      aria-hidden
                      onClick={() => setShowProductPicker(false)}
                    />
                    <div className="absolute right-0 top-full z-20 mt-1 w-72 rounded-2xl border border-neutral-200 bg-white py-2 shadow-lg">
                      <p className="px-4 py-2 text-xs font-medium text-neutral-500">{t("blog.editor.insertProductHint")}</p>
                      <ul className="max-h-60 overflow-y-auto">
                        {products.map((p) => (
                          <li key={p.id}>
                            <button
                              type="button"
                              onClick={() => insertProduct(p.id)}
                              className="w-full px-4 py-3 text-left text-sm text-neutral-900 hover:bg-neutral-50 flex justify-between items-center gap-2"
                            >
                              <span className="truncate">{p.name}</span>
                              <span className="text-neutral-500 shrink-0">{p.price.toLocaleString(priceLocale)}{currencySuffix}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
                </div>
              )}
            </div>
          </div>
          {showPreview ? (
            <div className="min-h-[280px] rounded-2xl border border-neutral-200 bg-white p-5 text-neutral-700">
              <PostBody bodyMd={bodyMd} productsById={productsById} domain={domain} />
            </div>
          ) : (
            <textarea
              ref={bodyMdRef}
              id="body_md"
              name="body_md"
              rows={12}
              value={bodyMd}
              onChange={(e) => setBodyMd(e.target.value)}
              className="w-full min-h-[280px] rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 font-mono transition-all"
              placeholder={t("blog.editor.bodyPlaceholder")}
            />
          )}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="publish"
            name="publish"
            value="on"
            defaultChecked={initialPublished}
            className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20"
          />
          <Label htmlFor="publish" className="text-sm text-neutral-700 font-normal cursor-pointer">
            {t("blog.editor.publishLabel")}
          </Label>
        </div>
        {error && <p className="text-sm text-red-600">{t(error)}</p>}
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? t("blog.form.saving") : t("blog.form.save")}
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/${domain}/post/${initialSlug}`}>{t("blog.form.cancel")}</Link>
          </Button>
        </div>
      </form>

      <hr className="border-neutral-100" />

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-neutral-800">{t("blog.editPost.dangerZoneTitle")}</h3>
        <p className="text-sm text-neutral-600">
          {t("blog.editPost.dangerZoneDesc")}
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={handleDelete}
          disabled={loading}
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          {t("blog.editPost.deleteButton")}
        </Button>
      </div>
    </div>
  );
}
