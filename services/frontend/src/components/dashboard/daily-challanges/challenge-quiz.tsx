import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { Question } from "@/interface/challenge.interface";

interface ChallengeQuizProps {
  questions: Question[];
  onFinish: (score: number, accuracy: number) => void;
}

export const ChallengeQuiz: React.FC<ChallengeQuizProps> = ({
  questions,
  onFinish,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const currentQuestion = questions[currentIdx];

  useEffect(() => {
    setTimeLeft(30);
    setSelectedIdx(null);
    setIsAnswered(false);
  }, [currentIdx]);

  useEffect(() => {
    if (isAnswered || timeLeft <= 0) {
      if (timeLeft === 0 && !isAnswered) handleOptionClick(-1);
      return;
    }

    const timer = setTimeout(
      () => setTimeLeft((prev) => prev - 1),
      1000
    );

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;

    setSelectedIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuestion.correctAnswerIndex;

    let newScore = score;
    let newCorrectCount = correctAnswersCount;

    if (isCorrect) {
      newScore += 24;
      newCorrectCount += 1;

      setScore(newScore);
      setCorrectAnswersCount(newCorrectCount);
    }

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        const finalAccuracy = Math.round(
          (newCorrectCount / questions.length) * 100
        );

        onFinish(newScore, finalAccuracy);
      }
    }, 3500);
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 p-3 sm:p-4 text-foreground">

      <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-muted-foreground gap-2">

        <div>
          Question {currentIdx + 1} / {questions.length}
        </div>

        <div className="text-lg sm:text-xl text-cyan-500 dark:text-cyan-400 font-mono">
          :{timeLeft.toString().padStart(2, "0")}
        </div>

        <div className="text-indigo-600 dark:text-indigo-400">
          Score: {score}
        </div>
      </div>


      <Card className="border-border bg-card">
        <CardContent className="p-4 sm:p-6 text-base sm:text-lg font-semibold text-foreground leading-relaxed">
          {currentQuestion.text}
        </CardContent>
      </Card>


      <div className="space-y-3">
        {currentQuestion.options.map((option, idx) => {
          const isCurrentSelected = selectedIdx === idx;
          const isCorrectAns =
            idx === currentQuestion.correctAnswerIndex;

          let optionStyle =
            "custom-surface text-foreground hover:border hover:border-primary/30";

          if (isAnswered) {
            if (isCorrectAns) {
              optionStyle =
                "bg-emerald-100 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400";
            } else if (
              isCurrentSelected &&
              !isCorrectAns
            ) {
              optionStyle =
                "bg-rose-100 dark:bg-rose-950/30 border-rose-500 text-rose-700 dark:text-rose-400";
            } else {
              optionStyle =
                "bg-slate-100 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800 text-slate-500 opacity-70";
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionClick(idx)}
              className={` w-full text-left p-3 sm:p-4 rounded-xl border flex items-center gap-3 transition-all duration-200 text-sm sm:text-base font-medium
                ${optionStyle}
              `}
            >
              <span className="font-semibold text-cyan-600 dark:text-cyan-400 shrink-0">
                {optionLabels[idx]}.
              </span>

              <span className="flex-1 leading-relaxed">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={` p-3 sm:p-4 rounded-xl text-sm sm:text-base font-medium border flex items-start gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300

            ${selectedIdx ===
              currentQuestion.correctAnswerIndex
              ? "bg-emerald-100 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
              : "bg-rose-100 dark:bg-rose-950/40 border-rose-500/30 text-rose-700 dark:text-rose-400"
            }
          `}
        >
          {selectedIdx ===
            currentQuestion.correctAnswerIndex ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 fill-emerald-500 text-white dark:text-slate-950" />
          ) : (
            <XCircle className="w-5 h-5 shrink-0 mt-0.5 fill-rose-500 text-white dark:text-slate-950" />
          )}

          <div className="leading-relaxed">
            <span className="font-bold mr-1">
              {selectedIdx ===
                currentQuestion.correctAnswerIndex
                ? "Correct!"
                : "Wrong!"}
            </span>

            {currentQuestion.explanation}
          </div>
        </div>
      )}
    </div>
  );
};