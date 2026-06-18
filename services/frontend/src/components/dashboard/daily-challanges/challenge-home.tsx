import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Flame,
  Zap,
  HelpCircle,
  CalendarDays,
  Trophy,
} from "lucide-react";
import {
  useGetChallengeCalendarQuery,
  useGetChallengeHistoryQuery,
  useGetUserStreakQuery,
} from "@/store/api/challengesApi";
import { buildWeeklyDays, formatDate } from "@/lib/challenge.utils";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";
import { ChallengeHistoryItem, ChallengeHomeProps } from "@/interface/challenge.interface";


export const ChallengeHome: React.FC<ChallengeHomeProps> = ({
  onStart,
  subjectName,
  difficulty,
  isCompleted,
  onViewResult,
}) => {
  const { data: historyData, isLoading: historyLoading } = useGetChallengeHistoryQuery();
  const { data: streakData, isLoading: streakLoading } = useGetUserStreakQuery();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { data: calendarData } = useGetChallengeCalendarQuery(currentMonth);

  const pastChallenges: ChallengeHistoryItem[] = historyData?.history || [];
  const weeklyDays = buildWeeklyDays(calendarData?.calendar || []);

  if (historyLoading || streakLoading) {
    return (
      <div className="min-h-screen my-10 flex flex-col gap-3">
        <AppSkeletonCard />
        <AppSkeletonCard />
        <AppSkeletonCard />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full space-y-5 sm:space-y-6">
      <Card className="relative overflow-hidden border-border bg-card backdrop-blur-md">
        <div className="absolute top-0 right-0 w-40 sm:w-48 h-40 sm:h-48 bg-purple-600/10 rounded-full blur-3xl -z-10" />

        <CardContent className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-3 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-500 dark:fill-amber-400" />
                Daily Challenge
              </span>

              <span className="bg-blue-500/10 border border-blue-500/30 text-blue-500 dark:text-blue-400 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full">
                {subjectName}
              </span>

              <span className="bg-purple-500/10 border border-purple-500/30 text-purple-500 dark:text-purple-400 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full">
                {difficulty}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-snug">
                Today&apos;s Challenge is Ready!
              </h2>

              <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
                A fresh question awaits you. Solve it correctly to earn{" "}
                <span className="text-amber-500 dark:text-amber-400 font-semibold">
                  +150 XP bonus
                </span>
                . Timer resets in 23h 41m.
              </p>
            </div>
          </div>

          {isCompleted ? (
            <Button
              onClick={onViewResult}
              variant="secondary"
              className="rounded-xl w-full sm:w-auto h-11 px-5 shrink-0 border border-primary"
            >
              <Trophy className="w-4 h-4 mr-2 text-amber-500" />
              View Result
            </Button>
          ) : (
            <Button
              onClick={onStart}
              className="rounded-xl w-full sm:w-auto h-11 px-5 shrink-0"
            >
              <Zap className="w-4 h-4 fill-white" />
              Accept Challenge
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="border-border bg-card overflow-hidden">
        <CardContent className="p-3 sm:p-5 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2 text-foreground">
              <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              </div>

              <span>This Week&apos;s Streak</span>
            </h3>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[11px] font-semibold">
                🔥 {streakData?.current || 0} Current
              </div>

              <div className="px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[11px] font-semibold">
                🏆 {streakData?.longest || 0} Best
              </div>

              <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[11px] font-semibold">
                🎯 {streakData?.averageScore || 0}% Avg
              </div>

              <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-[11px] font-semibold">
                📚 {streakData?.totalAttempts || 0} Attempts
              </div>
            </div>
          </div>

          {/* Week Grid */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {weeklyDays.map((item) => (
              <div
                key={item.day}
                className="flex flex-col items-center gap-2"
              >
                {/* Day Circle */}
                <div
                  className={`
              relative
              w-12 h-12 rounded-2xl border
              flex items-center justify-center
              transition-all duration-300

              ${item.isCompleted
                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-500 shadow-sm shadow-emerald-500/20"
                      : ""
                    }

              ${item.isToday && !item.isCompleted
                      ? "bg-indigo-500/10 border-indigo-500 text-indigo-500 shadow-sm shadow-indigo-500/20"
                      : ""
                    }

              ${!item.isCompleted && !item.isToday
                      ? "bg-muted/30 border-dashed border-muted-foreground/30 text-muted-foreground"
                      : ""
                    }
            `}
                >
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white dark:text-slate-950" />
                  ) : item.isToday ? (
                    <Zap className="w-5 h-5 fill-indigo-500 text-indigo-500" />
                  ) : (
                    <XCircle className="w-4 h-4 opacity-40" />
                  )}

                  {/* Score Badge */}
                  {item.isCompleted && (
                    <div className="absolute -bottom-1.5 -right-1.5 min-w-[22px] h-5 px-1 rounded-full bg-background border border-emerald-500/20 shadow-sm flex items-center justify-center">
                      <span className="text-[9px] font-bold text-emerald-500">
                        {item.score}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Day Info */}
                <div className="text-center leading-tight">
                  <p className="text-xs font-semibold text-foreground">
                    {item.day}
                  </p>

                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {formatDate(item.dateString)}
                  </p>

                  {item.isCompleted ? (
                    <p className="text-[10px] font-medium text-yellow-500 mt-1">
                      +{item.xpEarned} XP
                    </p>
                  ) : item.isToday ? (
                    <p className="text-[10px] font-medium text-indigo-500 mt-1">
                      Today
                    </p>
                  ) : (
                    <p className="text-[10px] text-muted-foreground/50 mt-1">
                      ---
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-5 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            Challenge History
          </h3>

          {pastChallenges.length === 0 && (
            <div className="py-10 text-center text-muted-foreground">
              No challenge history found
            </div>
          )}
          {pastChallenges.map((item) => {
            const isPerfect = item.score === 100;

            return (
              <div
                key={item._id}
                className="rounded-2xl border border-border bg-muted/20 p-3 sm:p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-5">
                  <div className="flex items-start gap-3 min-w-0">

                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0
                   ${isPerfect
                          ? "bg-emerald-500/15 text-emerald-500"
                          : "bg-amber-500/15 text-amber-500"
                        }`}
                    >
                      {isPerfect ? (
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </div>
                    <div className="space-y-2 min-w-0">

                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">
                          Daily Challenge
                        </h4>

                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {formatDate(item.dateString)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">

                        <div className="px-2 sm:px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] sm:text-xs font-semibold">
                          🎯 {item.score}%
                        </div>
                        <div className="px-2 sm:px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-[10px] sm:text-xs font-semibold">
                          ✅ {item.questionsCorrect}/5
                        </div>

                        <div className="px-2 sm:px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] sm:text-xs font-semibold">
                          ⏱ {item.timeSpent}s
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">

                    <div className="px-3 py-1 sm:px-4 sm:py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-xs sm:text-sm whitespace-nowrap">
                      +{item.xpEarned} XP
                    </div>

                    <div className={`text-[10px] sm:text-xs font-medium text-center sm:text-right
                     ${item.score >= 80
                        ? "text-emerald-500"
                        : item.score >= 50
                          ? "text-yellow-500"
                          : "text-rose-500"
                      }`}>
                      {item.score === 100
                        ? "Perfect 🔥"
                        : item.score >= 80
                          ? "Great 🚀"
                          : item.score >= 50
                            ? "Good 👍"
                            : "Improve 💪"}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
