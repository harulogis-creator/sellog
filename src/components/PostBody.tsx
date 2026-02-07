import ReactMarkdown from "react-markdown";
import { ProductCard } from "./ProductCard";
import { ProductEmbedFallback } from "./ProductEmbedFallback";

const PRODUCT_EMBED_REGEX = /\[product:([a-f0-9-]{36})\]/gi;

export interface ProductData {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
}

interface PostBodyProps {
  bodyMd: string;
  productsById: Map<string, ProductData>;
  /** 있으면 ProductCard 구매하기 링크 활성화 */
  domain?: string;
}

/**
 * 마크다운 본문 + [product:uuid] 상품 임베드 렌더링
 */
export function PostBody({ bodyMd, productsById, domain }: PostBodyProps) {
  const parts: ({ type: "text"; value: string } | { type: "product"; id: string })[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  PRODUCT_EMBED_REGEX.lastIndex = 0;
  while ((m = PRODUCT_EMBED_REGEX.exec(bodyMd)) !== null) {
    parts.push({ type: "text", value: bodyMd.slice(lastIndex, m.index) });
    parts.push({ type: "product", id: m[1].toLowerCase() });
    lastIndex = m.index + m[0].length;
  }
  parts.push({ type: "text", value: bodyMd.slice(lastIndex) });

  return (
    <div className="space-y-4">
      {parts.map((part, i) => {
        if (part.type === "text") {
          return (
            <div key={i} className="prose prose-slate max-w-none text-slate-700">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-3">{children}</p>,
                  h1: ({ children }) => <h2 className="text-xl font-bold mt-6 mb-2">{children}</h2>,
                  h2: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-3">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-3">{children}</ol>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                }}
              >
                {part.value}
              </ReactMarkdown>
            </div>
          );
        }
        const product = productsById.get(part.id);
        if (!product) {
          return <ProductEmbedFallback key={i} productId={part.id} />;
        }
        return <ProductCard key={i} {...product} domain={domain} />;
      })}
    </div>
  );
}
