import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { BlogForbiddenBlock } from "@/components/blog/BlogForbiddenBlock";
import { DomainHeader } from "@/components/layout/DomainHeader";
import { DomainPageContainer } from "@/components/layout/DomainPageContainer";
import { ProductEditForm } from "./ProductEditForm";

interface EditProductPageProps {
  params: Promise<{ domain: string; productId: string }>;
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const raw = await Promise.resolve(params);
  const domain = safeDecode(raw.domain);
  const productId = raw.productId;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: blog } = await supabase
    .from("blogs")
    .select("id, name, owner_id")
    .eq("subdomain", domain)
    .single();

  if (!blog) notFound();

  const isOwner = blog.owner_id === null || blog.owner_id === user?.id;
  if (!isOwner) {
    return (
      <BlogForbiddenBlock
        domain={domain}
        descriptionKey="productEdit"
        linkTo="productList"
      />
    );
  }

  const { data: product } = await supabase
    .from("products")
    .select("id, name, price, image_url, description")
    .eq("id", productId)
    .eq("blog_id", blog.id)
    .single();

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <DomainHeader
        domain={domain}
        blogName={blog.name}
        subtitleKey="blog.subtitle.editProduct"
        listHref={`/${domain}/products`}
        listLabelKey="blog.listLabel.default"
      />
      <DomainPageContainer>
        <ProductEditForm
          productId={product.id}
          domain={domain}
          initialName={product.name}
          initialPrice={product.price}
          initialImageUrl={product.image_url}
          initialDescription={product.description}
        />
      </DomainPageContainer>
    </main>
  );
}
