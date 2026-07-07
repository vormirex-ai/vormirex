import { Skeleton } from "@/components/ui/skeleton";

type SkeletonVariant =
  | "subject"
  | "quiz"
  | "history"
  | "quiz-history"
  | "leaderboard";

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


  /* ===================== LEADERBOARD ===================== */
  if (variant === "leaderboard") {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-52 bg-primary/20" />
            <Skeleton className="h-4 w-72 bg-primary/10" />
          </div>

          <Skeleton className="h-10 w-56 rounded-xl bg-primary/20" />
        </div>

        {/* Podium */}
        <div className="grid grid-cols-3 items-end gap-4 pt-6">
          {/* 2nd */}
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="w-16 h-16 rounded-full bg-primary/20" />
            <Skeleton className="h-4 w-20 bg-primary/10" />
            <Skeleton className="h-3 w-14 bg-primary/10" />
            <Skeleton className="w-full h-24 rounded-t-xl bg-primary/20" />
          </div>

          {/* 1st */}
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="w-20 h-20 rounded-full bg-primary/20" />
            <Skeleton className="h-4 w-24 bg-primary/10" />
            <Skeleton className="h-3 w-16 bg-primary/10" />
            <Skeleton className="w-full h-36 rounded-t-xl bg-primary/20" />
          </div>

          {/* 3rd */}
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="w-14 h-14 rounded-full bg-primary/20" />
            <Skeleton className="h-4 w-20 bg-primary/10" />
            <Skeleton className="h-3 w-14 bg-primary/10" />
            <Skeleton className="w-full h-20 rounded-t-xl bg-primary/20" />
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="custom-surface rounded-2xl p-3 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl p-3"
            >
              <div className="flex items-center gap-4 flex-1">
                <Skeleton className="h-5 w-5 bg-primary/20" />
                <Skeleton className="w-10 h-10 rounded-full bg-primary/20" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-36 bg-primary/20" />
                  <Skeleton className="h-3 w-24 bg-primary/10" />
                </div>
              </div>

              <Skeleton className="h-4 w-16 bg-primary/20" />
            </div>
          ))}
        </div>

        {/* Your Rank */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-24 bg-primary/20" />

          <div className="custom-surface rounded-2xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <Skeleton className="h-5 w-5 bg-primary/20" />
                <Skeleton className="w-10 h-10 rounded-full bg-primary/20" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-36 bg-primary/20" />
                  <Skeleton className="h-3 w-28 bg-primary/10" />
                </div>
              </div>

              <Skeleton className="h-4 w-16 bg-primary/20" />
            </div>
          </div>
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


