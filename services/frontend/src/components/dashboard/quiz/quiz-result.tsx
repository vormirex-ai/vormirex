import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  MessageSquareCode,
} from "lucide-react";

import { useNavigate } from "react-router";

export default function QuizResult({
  score,
  total,
  onRetake,
}: {
  onRetake: any;
  score: number;
  total: number;
}) {
  const navigate = useNavigate();

  return (
    <div className="text-center max-w-md w-full px-3 sm:px-4 flex flex-col items-center">

      <div className="text-5xl sm:text-6xl md:text-7xl mb-5 sm:mb-6 select-none animate-bounce">
        😊
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-primary-gradient font-sans tracking-tight">
        {score}/{total}
      </h1>

      <p className="text-gray-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8 mt-2">
        Good job! Keep practicing!
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full mb-6 sm:mb-8">
        <div className="bg-emerald-50 dark:bg-[#0b1c18] border border-emerald-200 dark:border-emerald-950/60 rounded-xl p-2.5 sm:p-4 flex flex-col items-center justify-center">

          <span className="text-sm sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
            +120 XP
          </span>

          <span className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
            Earned
          </span>
        </div>

        <div className="bg-blue-50 dark:bg-[#11192e] border border-blue-200 dark:border-blue-950/60 rounded-xl p-2.5 sm:p-4 flex flex-col items-center justify-center">

          <span className="text-sm sm:text-xl font-bold text-blue-700 dark:text-white">
            60%
          </span>

          <span className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
            Accuracy
          </span>
        </div>

        <div className="bg-orange-50 dark:bg-[#1c1412] border border-orange-200 dark:border-orange-950/60 rounded-xl p-2.5 sm:p-4 flex flex-col items-center justify-center">

          <span className="text-sm sm:text-xl font-bold text-orange-600 dark:text-orange-400 font-mono">
            01:06
          </span>

          <span className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
            Time Taken
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">

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