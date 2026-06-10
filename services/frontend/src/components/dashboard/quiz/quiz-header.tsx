import { Button } from "@/components/ui/button";
import { History, BrainCircuit } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export const QuizHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white md:text-4xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 shadow-lg shadow-cyan-500/10 dark:text-cyan-300">
              <BrainCircuit className="h-6 w-6" />
            </div>

            Quiz Arena
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 md:text-base">
            Challenge yourself with interactive quizzes
          </p>
        </div>

        <div className="flex gap-3">

          <Button
            variant="secondary"
            onClick={() => navigate("/practice/quiz/quiz-history")}
            className="flex items-center gap-2 rounded-xl border border-border/60 hover:border-primary  px-5 py-3 text-sm font-medium"
          >
            <History className="h-4 w-4" />
            All History
          </Button>

        </div>
      </div>
    </div>
  );
};