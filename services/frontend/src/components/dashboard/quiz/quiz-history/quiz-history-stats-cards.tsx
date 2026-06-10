import {
  Trophy,
  Target,
  BookOpen,
  BarChart3,
} from "lucide-react";

export default function QuizHistoryStatsCards({
  statsData,
  getSubjectName,
}: any) {
  const cards = [
    {
      title: "Total Quizzes",
      value:
        statsData?.totalQuizzesTaken || 0,
      icon: BookOpen,
    },
    {
      title: "Average Score",
      value: `${statsData?.overallAverage || 0}%`,
      icon: BarChart3,
    },
    {
      title: "Best Subject",
      value: getSubjectName(
        statsData?.bestSubject
      ),
      icon: Trophy,
    },
    {
      title: "Weakest Subject",
      value: getSubjectName(
        statsData?.weakestSubject
      ),
      icon: Target,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/5 to-primary/10" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {item.title}
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 dark:text-primary text-primary-500">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                {item.value}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}