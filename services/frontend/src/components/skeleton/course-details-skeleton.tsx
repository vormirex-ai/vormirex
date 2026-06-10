import { Skeleton } from "@/components/ui/skeleton";

export function CourseDetailsSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">

      <div className="h-5 w-36 rounded-md bg-card" />

      <div className="relative overflow-hidden rounded-2xl  border border-cyan-500/30 p-6 md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex-1 space-y-5">

            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-2xl" />

              <div className="space-y-3 flex-1">
                <Skeleton className="h-8 w-64" />

                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>

            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>

          <div className="flex flex-row lg:flex-col items-center gap-5">
            <div className="space-y-2">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="h-11 w-36 rounded-xl" />
          </div>
        </div>

        <Skeleton className="mt-8 h-2 w-full rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-cyan-500/30 p-5 space-y-5"
          >

            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-48" />
              </div>

              <Skeleton className="h-6 w-24 rounded-full" />
            </div>


            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className="flex items-center justify-between rounded-xl border border-cyan-500/30 p-4"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>

                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}