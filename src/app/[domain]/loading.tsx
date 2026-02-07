import { Skeleton } from "@/components/ui/skeleton";

export default function DomainLoading() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-2xl px-6 py-5 sm:px-8 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-40 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-2xl" />
          <Skeleton className="h-9 w-14 rounded-2xl" />
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-10 sm:py-12 space-y-6">
        <Skeleton className="h-6 w-48" />
        <div className="rounded-3xl border border-neutral-200/60 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100 last:border-b-0">
              <Skeleton className="h-5 w-3/4 rounded-xl" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
