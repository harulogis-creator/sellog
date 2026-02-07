import { createClient } from "@/utils/supabase/server";
import { BlogNotFoundBlock } from "@/components/blog/BlogNotFoundBlock";
import { DomainHeader } from "@/components/layout/DomainHeader";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutMessageBlock, CheckoutOrderHeading } from "./CheckoutBlocks";

interface CheckoutPageProps {
  params: Promise<{ domain: string }>;
  searchParams: Promise<{ product?: string }>;
}

function safeDecodeDomain(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export default async function CheckoutPage({ params, searchParams }: CheckoutPageProps) {
  const raw = await Promise.resolve(params);
  const domain = safeDecodeDomain(raw.domain);
  const { product: productId } = await Promise.resolve(searchParams);

  const supabase = await createClient();
  const { data: blog } = await supabase
    .from("blogs")
    .select("id, name")
    .eq("subdomain", domain)
    .single();

  if (!blog) return <BlogNotFoundBlock />;

  if (!productId) {
    return (
      <main className="min-h-screen bg-[#fbfbfd]">
        <DomainHeader domain={domain} blogName={blog.name} subtitleKey="blog.subtitle.checkout" />
        <CheckoutMessageBlock variant="selectProduct" domain={domain} />
      </main>
    );
  }

  const { data: product } = await supabase
    .from("products")
    .select("id, name, price, image_url")
    .eq("id", productId)
    .eq("blog_id", blog.id)
    .single();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fbfbfd]">
        <DomainHeader domain={domain} blogName={blog.name} subtitleKey="blog.subtitle.checkout" />
        <CheckoutMessageBlock variant="productNotFound" domain={domain} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfbfd]">
      <DomainHeader domain={domain} blogName={blog.name} subtitleKey="blog.subtitle.checkoutOrder" />
      <div className="max-w-md mx-auto px-6 sm:px-8 py-10 sm:py-12">
        <CheckoutOrderHeading />
        <CheckoutForm
          domain={domain}
          productId={product.id}
          productName={product.name}
          productPrice={product.price}
          productImageUrl={product.image_url}
        />
      </div>
    </main>
  );
}
