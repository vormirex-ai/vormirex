import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Flame,
  Zap,
  HelpCircle,
} from "lucide-react";
import { PastChallenge } from "@/interface/challenge.interface";

interface ChallengeHomeProps {
  onStart: () => void;
  streakDays: number;
  pastChallenges: PastChallenge[];
}

export const ChallengeHome: React.FC<ChallengeHomeProps> = ({
  onStart,
  streakDays,
  pastChallenges,
}) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const completedDays = [true, true, true, false, false, false, false];

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
                Mathematics
              </span>

              <span className="bg-purple-500/10 border border-purple-500/30 text-purple-500 dark:text-purple-400 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full">
                Medium
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

          <Button
            onClick={onStart}
            className="rounded-xl w-full sm:w-auto h-11 px-5 shrink-0"
          >
            <Zap className="w-4 h-4 fill-white" />
            Accept Challenge
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border bg-card overflow-hidden">
        <CardContent className="p-3 sm:p-5 space-y-4">

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-semibold flex items-center gap-1.5 text-foreground">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 shrink-0" />
              <span>This Week&apos;s Streak</span>
            </h3>

            <div className="text-[11px] sm:text-sm text-muted-foreground whitespace-nowrap">
              🔥 {streakDays} Day Streak
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
            {daysOfWeek.map((day, idx) => {
              const isToday = idx === 3;
              const isCompleted = completedDays[idx];

              return (
                <div
                  key={day}
                  className="flex flex-col items-center gap-1.5 min-w-0"
                >
                  <div
                    className={` w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl flex items-center justify-center border transition-all duration-200 shrink-0

                ${isCompleted
                        ? "bg-emerald-100 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                        : ""
                      }

                ${isToday && !isCompleted
                        ? "bg-indigo-50 dark:bg-slate-900 border-indigo-500 text-indigo-600 dark:text-indigo-400 ring-2 sm:ring-4 ring-indigo-500/10"
                        : ""
                      }

                ${!isCompleted && !isToday
                        ? "bg-slate-100 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-700 text-slate-500"
                        : ""
                      }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-500 text-white dark:text-slate-950" />
                    ) : isToday ? (
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-indigo-500 text-indigo-500" />
                    ) : (
                      <span className="text-xs sm:text-base font-light">-</span>
                    )}
                  </div>

                  <span
                    className={`
                text-[9px] sm:text-xs truncate text-center leading-none

                ${isToday
                        ? "text-indigo-600 dark:text-indigo-400 font-medium"
                        : "text-slate-600 dark:text-slate-500"
                      }
              `}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>


      <Card className="border-border bg-card">
        <CardContent className="p-4 sm:p-5 space-y-4">
          <h3 className="text-sm sm:text-base font-semibold flex items-center gap-1.5 text-foreground">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            Past Challenges
          </h3>

          <div className="divide-y divide-border">
            {pastChallenges.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 shrink-0">
                    {item.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 fill-rose-500/10" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {item.title}
                    </h4>

                    <p className="text-xs text-muted-foreground mt-1">
                      {item.timeAgo} ·{" "}
                      <span className="capitalize">{item.category}</span>
                    </p>
                  </div>
                </div>

                <div className="sm:self-center">
                  {item.status === "completed" ? (
                    <span className="inline-flex text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      +{item.xpEarned} XP
                    </span>
                  ) : (
                    <span className="inline-flex text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                      Missed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};