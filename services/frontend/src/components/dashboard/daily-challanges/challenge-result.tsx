import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { Button } from "@/components/ui/button";

interface ChallengeResultProps {
  score: number;
  accuracy: number;
  onExit: () => void;
  challengeResult?: any;
}

export const ChallengeResult: React.FC<ChallengeResultProps> = ({
  score,
  accuracy,
  onExit,
  challengeResult,
}) => {
  const { width, height } = useWindowSize();
  const correctAnswers = challengeResult?.questionsCorrect || 0;
  const totalQuestions = challengeResult?.answers?.length || 0;
  const xpEarned = challengeResult?.xpEarned || 0;
  const timeSpent = challengeResult?.timeSpent || 0;
  const finalScore = score > 0 ? score : challengeResult?.score || 0;
  const finalAccuracy = accuracy > 0 ? accuracy : Math.round(((challengeResult?.questionsCorrect || 0) / (challengeResult?.answers?.length || 1)) * 100);

  const getResultEmoji = () => {
    if (finalScore >= 90 && finalAccuracy >= 90) return "👑";
    if (finalScore >= 80) return "🏆";
    if (finalScore >= 60) return "🔥";
    if (finalScore >= 40) return "💪";
    if (finalScore >= 20) return "🙂";

    return "😅";
  };
  return (
    <div className="mx-auto text-center space-y-6 py-12 px-4 text-slate-200 relative justify-center min-h-[70vh] overflow-hidden">

      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={220}
        gravity={0.18}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="flex justify-center relative z-10">
        <div
          className={`text-5xl p-4 rounded-full animate-bounce duration-1000 border
    ${finalAccuracy >= 90
              ? "bg-yellow-500/10 border-yellow-500/30"
              : finalAccuracy >= 75
                ? "bg-orange-500/10 border-orange-500/30"
                : finalAccuracy >= 50
                  ? "bg-cyan-500/10 border-cyan-500/30"
                  : "bg-slate-500/10 border-slate-500/30"
            }
  `}
        >
          {getResultEmoji()}
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <h2 className="text-3xl font-black text-primary tracking-tight">
          Today's Challenge Completed
        </h2>

        <p className="text-sm text-slate-400">
          Come back tomorrow for a new challenge 🚀
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm dark:shadow-none">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">
            Score
          </p>
          <h3 className="text-3xl font-black text-primary">
            {finalScore}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm dark:shadow-none">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">
            Accuracy
          </p>
          <h3 className="text-3xl font-black text-green-400">
            {finalAccuracy}%
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm dark:shadow-none">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">
            Correct
          </p>
          <h3 className="text-2xl font-black text-cyan-400">
            {correctAnswers}/{totalQuestions}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm dark:shadow-none">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">
            XP Earned
          </p>
          <h3 className="text-2xl font-black text-yellow-400">
            +{xpEarned}
          </h3>
        </div>
      </div>

      <div className="relative z-10 text-sm text-slate-400">
        Time Spent: {timeSpent}s
      </div>

      <div className="flex items-center justify-center gap-3 relative z-10 pt-4">
        <Button
          onClick={onExit}
          className="rounded-xl px-8 py-5"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};