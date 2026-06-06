import { Button } from "@/components/ui/button";
import { Target, Play } from "lucide-react";

export default function QuizStart({
  onStart,
  totalQuestions,
}: {
  onStart: any;
  totalQuestions: any;
}) {
  return (
    <div className="text-center max-w-md w-full px-3 sm:px-4">

      <div className="flex justify-center mb-5 sm:mb-6">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Target className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full border-2 border-[#090d16]" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-3 tracking-wide leading-snug">
        Mathematics Quiz
      </h1>

      <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
        Test your knowledge of Integration Techniques.{" "}
        {totalQuestions} questions · AI explanations · Instant
        feedback
      </p>

      <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3 mb-6 sm:mb-8">

        <div className="bg-card dark:bg-[#0f1524] border border-blue-900/40 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold">
            {totalQuestions}
          </span>

          <span className="text-[10px] sm:text-xs text-gray-500 mt-1">
            Questions
          </span>
        </div>

        <div className="bg-card dark:bg-[#1c1412] border border-orange-950/40 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold">
            10 min
          </span>

          <span className="text-[10px] sm:text-xs text-gray-500 mt-1">
            Time Limit
          </span>
        </div>

        <div className="bg-card dark:bg-[#141026] border border-purple-950/40 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold">
            +200
          </span>

          <span className="text-[10px] sm:text-xs text-gray-500 mt-1">
            XP Reward
          </span>
        </div>
      </div>

      <Button
        className="w-full rounded-lg py-5 sm:py-6 text-sm sm:text-base"
        onClick={onStart}
      >
        <Play className="w-4 h-4 fill-current mr-2" />
        Start Quiz
      </Button>
    </div>
  );
}