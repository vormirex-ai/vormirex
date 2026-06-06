export function RoadmapProgressCard() {
  return (
    <div className="rounded-2xl sm:rounded-3xl custom-surface p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">

      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between mb-6">
        <div className="min-w-0">

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-snug">
            Mathematics Mastery Roadmap
          </h2>

          <p className="text-sm sm:text-base text-textColor leading-relaxed">
            Calculus → Linear Algebra → Statistics → Number Theory
          </p>
        </div>

        <div className="md:text-right">

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            38%
          </h3>

          <p className="text-sm sm:text-base text-textColor mt-1 sm:mt-2">
            Complete
          </p>
        </div>
      </div>

      <div className="w-full h-3 rounded-full dark:bg-muted bg-gray-400 overflow-hidden mb-5">
        <div className="h-full w-[38%] bg-primary-gradient rounded-full" />
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5 lg:gap-6 text-xs sm:text-sm text-textColor">

        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
          8 topics done
        </span>

        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
          3 in progress
        </span>

        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-500 shrink-0" />
          10 upcoming
        </span>
      </div>
    </div>
  );
}