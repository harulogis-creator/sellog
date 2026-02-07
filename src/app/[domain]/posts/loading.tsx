import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoading() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-neutral-200/60 bg-white/80 backdrop-blur-2xl px-6 py-5 sm:px-8 flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-24 rounded-2xl" />
      </header>
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-10 sm:py-12 space-y-8">
        <Skeleton className="h-4 w-36" />
        <div className="rounded-3xl bg-white border border-neutral-200/60 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-4 min-h-[56px] border-b border-neutral-100 last:border-b-0">
              <div className="min-w-0 flex-1">
                <Skeleton className="h-5 w-48 rounded-lg" />
                <Skeleton className="h-3 w-24 mt-2 rounded" />
              </div>
              <Skeleton className="h-6 w-14 rounded-full" />
              <Skeleton className="h-9 w-14 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
