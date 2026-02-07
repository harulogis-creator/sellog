import { createClient } from "@/utils/supabase/server";
import { BlogNotFoundBlock } from "@/components/blog/BlogNotFoundBlock";
import { DomainHeader } from "@/components/layout/DomainHeader";
import { CheckoutFailBlock } from "../CheckoutBlocks";

interface FailPageProps {
  params: Promise<{ domain: string }>;
  searchParams: Promise<{ product?: string; reason?: string }>;
}

function safeDecodeDomain(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export default async function CheckoutFailPage({ params, searchParams }: FailPageProps) {
  const raw = await Promise.resolve(params);
  const domain = safeDecodeDomain(raw.domain);
  const { product: productId, reason } = await Promise.resolve(searchParams);

  const supabase = await createClient();
  const { data: blog } = await supabase
    .from("blogs")
    .select("id, name")
    .eq("subdomain", domain)
    .single();

  if (!blog) return <BlogNotFoundBlock />;

  return (
    <main className="min-h-screen bg-[#fbfbfd]">
      <DomainHeader domain={domain} blogName={blog.name} subtitleKey="blog.subtitle.checkoutFail" />
      <CheckoutFailBlock domain={domain} productId={productId} reason={reason} />
    </main>
  );
}
