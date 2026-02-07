import { createClient } from "@/utils/supabase/server";
import { BlogForbiddenBlock } from "@/components/blog/BlogForbiddenBlock";
import { BlogNotFoundBlock } from "@/components/blog/BlogNotFoundBlock";
import { BlogSectionHeader } from "@/components/blog/BlogSectionHeader";
import { DomainHeader } from "@/components/layout/DomainHeader";
import { DomainPageContainer } from "@/components/layout/DomainPageContainer";
import { EmptyState } from "@/components/EmptyState";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";

interface ProductsPageProps {
  params: Promise<{ domain: string }>;
}

function safeDecodeDomain(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const raw = await Promise.resolve(params);
  const domain = safeDecodeDomain(raw.domain);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: blog } = await supabase
    .from("blogs")
    .select("id, name, owner_id")
    .eq("subdomain", domain)
    .single();

  let products: { id: string; name: string; price: number; image_url: string | null }[] = [];
  if (blog) {
    const prodsRes = await supabase
      .from("products")
      .select("id, name, price, image_url")
      .eq("blog_id", blog.id)
      .order("created_at", { ascending: false });
    if (prodsRes.data) products = prodsRes.data;
  }

  if (!blog) return <BlogNotFoundBlock />;

  const isOwner = blog.owner_id === null || blog.owner_id === user?.id;
  if (!isOwner) {
    return (
      <BlogForbiddenBlock
        domain={domain}
        descriptionKey="products"
        linkTo="loginAndBlog"
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <DomainHeader
        domain={domain}
        blogName={blog.name}
        subtitleKey="blog.subtitle.products"
        listHref={`/${domain}/products`}
        listLabelKey="blog.listLabel.products"
      />
      <DomainPageContainer className="space-y-12">
        <section className="space-y-5">
          <BlogSectionHeader messageKey="blog.section.addProduct" />
          <ProductForm blogId={blog.id} domain={domain} />
        </section>
        <section className="space-y-5">
          <BlogSectionHeader messageKey="blog.section.registeredProducts" />
          {products.length === 0 ? (
            <EmptyState
              titleKey="blog.empty.noProducts"
              descriptionKey="blog.empty.noProductsDesc"
            />
          ) : (
            <ProductList domain={domain} products={products} />
          )}
        </section>
      </DomainPageContainer>
    </main>
  );
}
