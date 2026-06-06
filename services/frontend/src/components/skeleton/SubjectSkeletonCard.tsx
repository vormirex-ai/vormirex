import { Skeleton } from "@/components/ui/skeleton";

export const SubjectSkeletonCard = () => {
  return (
    <div className="p-4 rounded-xl border border-cyan-500/10 bg-muted/20 space-y-4 relative overflow-hidden">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg bg-primary/20" />

        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2 bg-primary/20" />
          <Skeleton className="h-3 w-1/3 bg-primary/10" />
        </div>
      </div>


      <Skeleton className="h-3 w-full bg-primary/10" />
      <Skeleton className="h-3 w-4/5 bg-primary/10" />


      <div className="space-y-2">
        <Skeleton className="h-2 w-full rounded-full bg-primary/20" />

        <div className="flex justify-between">
          <Skeleton className="h-3 w-16 bg-primary/10" />
          <Skeleton className="h-3 w-12 bg-primary/10" />
        </div>
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full bg-primary/10" />
        <Skeleton className="h-6 w-20 rounded-full bg-primary/10" />
      </div>
    </div>
  );
};