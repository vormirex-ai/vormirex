import { Skeleton } from "@/components/ui/skeleton";

type SkeletonVariant =
  | "subject"
  | "quiz"
  | "history"
  | "quiz-history";

interface Props {
  variant?: SkeletonVariant;
}

export const AppSkeletonCard = ({ variant = "subject" }: Props) => {
  /* ===================== QUIZ HISTORY ===================== */
  if (variant === "quiz-history") {
    return (
      <div className="space-y-6 w-full m-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 bg-primary/20" />
            <Skeleton className="h-4 w-72 bg-primary/10" />
          </div>

          <Skeleton className="h-10 w-40 rounded-lg bg-primary/20" />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-cyan-500/10 bg-muted/20 space-y-3"
            >
              <Skeleton className="h-4 w-24 bg-primary/20" />
              <Skeleton className="h-8 w-16 bg-primary/10" />
              <Skeleton className="h-3 w-32 bg-primary/10" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-cyan-500/10 bg-muted/20 space-y-3"
            >
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-40 bg-primary/20" />
                <Skeleton className="h-4 w-20 bg-primary/10" />
              </div>

              <Skeleton className="h-3 w-full bg-primary/10" />
              <Skeleton className="h-3 w-5/6 bg-primary/10" />

              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-24 bg-primary/10" />
                <Skeleton className="h-8 w-24 rounded-full bg-primary/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------- Quiz ------------------------------

  if (variant === "quiz") {
    return (
      <div className="custom-surface rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl space-y-6">
        <Skeleton className="h-6 w-24 rounded-full bg-primary/20" />

        <div className="space-y-3">
          <Skeleton className="h-6 w-full bg-primary/20" />
          <Skeleton className="h-6 w-5/6 bg-primary/10" />
          <Skeleton className="h-6 w-3/4 bg-primary/10" />
        </div>

        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-xl border border-cyan-500/10 bg-muted/20 flex items-center gap-3 sm:gap-4"
            >
              <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-full bg-primary/10" />
                <Skeleton className="h-3 w-2/3 bg-primary/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="p-4 rounded-xl border border-cyan-500/10 bg-muted/20 space-y-4">
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