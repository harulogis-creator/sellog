import { createClient } from "@/utils/supabase/server";
import { BlogNotFoundBlock } from "@/components/blog/BlogNotFoundBlock";
import { DomainHeader } from "@/components/layout/DomainHeader";
import { CheckoutCancelBlock } from "../CheckoutBlocks";

interface CancelPageProps {
  params: Promise<{ domain: string }>;
}

function safeDecodeDomain(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export default async function CheckoutCancelPage({ params }: CancelPageProps) {
  const raw = await Promise.resolve(params);
  const domain = safeDecodeDomain(raw.domain);

  const supabase = await createClient();
  const { data: blog } = await supabase
    .from("blogs")
    .select("id, name")
    .eq("subdomain", domain)
    .single();

  if (!blog) return <BlogNotFoundBlock />;

  return (
    <main className="min-h-screen bg-[#fbfbfd]">
      <DomainHeader domain={domain} blogName={blog.name} subtitleKey="blog.subtitle.checkoutCancel" />
      <CheckoutCancelBlock domain={domain} />
    </main>
  );
}
