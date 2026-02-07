import { cn } from "@/lib/utils";

/**
 * [domain] 내부 페이지 공통 콘텐츠 영역 (max-width, padding)
 * 글 목록, 상품 목록, 설정, 글쓰기 등에서 동일한 너비·여백 유지
 */
export function DomainPageContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("max-w-2xl mx-auto px-6 sm:px-8 py-10 sm:py-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}
