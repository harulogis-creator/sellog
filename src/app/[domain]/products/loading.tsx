import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-2xl px-6 py-5 sm:px-8 flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-28 rounded-2xl" />
      </header>
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-10 sm:py-12 space-y-6">
        <Skeleton className="h-4 w-40" />
        <div className="rounded-3xl border border-neutral-200/60 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 min-h-[72px] border-b border-neutral-100 last:border-b-0">
              <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <Skeleton className="h-4 w-20 mt-1 rounded" />
              </div>
              <Skeleton className="h-9 w-14 rounded-2xl" />
              <Skeleton className="h-9 w-14 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
