import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  MessageSquareCode,
  Trophy,
  Target,
  Clock3,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router";

type QuizResultProps = {
  score: number;
  total: number;
  xp: number;
  accuracy: number;
  timeTaken: number;
  onRetake: () => void;
  onGoSubjects: () => void;
};

export default function QuizResult({
  score,
  total,
  xp,
  accuracy,
  timeTaken,
  onRetake,
  onGoSubjects,
}: QuizResultProps) {
  const navigate = useNavigate();

  const correctAnswers = Math.round(
    (score / 100) * total
  );

  const mins = Math.floor(timeTaken / 60)
    .toString()
    .padStart(2, "0");

  const secs = (timeTaken % 60)
    .toString()
    .padStart(2, "0");

  const emoji =
    accuracy >= 80
      ? "🏆"
      : accuracy >= 50
        ? "😊"
        : "😅";

  return (
    <div className="text-center max-w-[38rem] w-full px-3 sm:px-4 flex flex-col items-center">

      {/* BACK BUTTON */}
      <div className="w-full flex justify-start mb-6">
        <Button
          variant="secondary"
          onClick={onGoSubjects}
          className="rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go To Subjects
        </Button>
      </div>

      <div className="text-5xl sm:text-6xl md:text-7xl mb-5 sm:mb-6 select-none animate-bounce">
        {emoji}
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-primary-gradient font-sans tracking-tight">
        {correctAnswers}/{total}
      </h1>

      <p className="text-gray-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8 mt-2">
        Quiz Completed Successfully 🎉
      </p>

      <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Score */}
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-center gap-2 text-violet-400">
            <Trophy className="h-5 w-5" />

            <span className="text-2xl font-bold">
              {score}%
            </span>
          </div>

          <div className="mt-1 text-xs text-violet-200/70">
            Quiz Score
          </div>
        </div>

        {/* XP */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <Target className="h-5 w-5" />

            <span className="text-2xl font-bold">
              +{xp} XP
            </span>
          </div>

          <div className="mt-1 text-xs text-emerald-200/70">
            XP Earned
          </div>
        </div>

        {/* Time */}
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-center gap-2 text-orange-400">
            <Clock3 className="h-5 w-5" />

            <span className="font-mono text-2xl font-bold">
              {mins}:{secs}
            </span>
          </div>

          <div className="mt-1 text-xs text-orange-200/70">
            Time Taken
          </div>
        </div>
      </div>

      {/* Accuracy */}
      <div className="mt-8 w-full">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Accuracy
          </span>

          <span className="font-semibold text-cyan-400">
            {accuracy}%
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
            style={{
              width: `${accuracy}%`,
            }}
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">

        <Button
          onClick={onRetake}
          className="flex-1 font-medium py-5 sm:py-6 rounded-xl flex items-center justify-center gap-2 text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Retake Quiz
        </Button>

        <Button
          variant="outline"
          className="flex-1 font-medium py-5 sm:py-6 rounded-xl flex items-center justify-center gap-2 text-sm"
          onClick={() => navigate("/dashboard/ai-chat")}
        >
          <MessageSquareCode className="w-4 h-4 text-gray-400" />
          Ask AI for Help
        </Button>
      </div>
    </div>
  );
}