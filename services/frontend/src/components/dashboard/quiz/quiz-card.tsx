import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle2, XCircle, Lightbulb, ArrowRight, ArrowLeft } from "lucide-react";
import { useVerifyQuizAnswerMutation } from "@/store/api/quizzesApi";


export default function QuizCard({
  questions,
  onFinish,
  onBack,
}: {
  questions: any[];
  onFinish: any;
  onBack: any;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [verifyResult, setVerifyResult] = useState<any>(null);


  const [verifyQuizAnswer] = useVerifyQuizAnswerMutation();
  const currentQuestion = questions[currentIndex] || questions[0];
  const progressValue = ((currentIndex + 1) / questions.length) * 100;

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return `
        bg-green-500/10 text-green-600 border-green-500/30
        dark:bg-green-500/10 dark:text-green-300 dark:border-green-400/20
        backdrop-blur-md
      `;

      case "intermediate":
        return `
        bg-yellow-500/10 text-yellow-600 border-yellow-500/30
        dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-400/20
        backdrop-blur-md
      `;

      case "advanced":
        return `
        bg-red-500/10 text-red-600 border-red-500/30
        dark:bg-red-500/10 dark:text-red-300 dark:border-red-400/20
        backdrop-blur-md
      `;

      default:
        return `
        bg-gray-500/10 text-gray-600 border-gray-500/30
        dark:bg-gray-500/10 dark:text-gray-300 dark:border-gray-400/20
        backdrop-blur-md
      `;
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) =>
        prev > 0 ? prev - 1 : 0,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins
      .toString()
      .padStart(2, "0")
      }:${secs
        .toString()
        .padStart(2, "0")
      } `;
  };

  const handleOptionSelect = async (option: string) => {
    if (isSubmitted) return;

    setSelectedOption(option);

    const response = await verifyQuizAnswer({
      questionId: currentQuestion._id,
      selectedOption: option,
    }).unwrap();

    setVerifyResult(response);
    setIsSubmitted(true);

    if (response?.isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion._id,
        selectedOption: option,
        isCorrect: response?.isCorrect,
      },
    ]);
  };

  const handleNext = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      return;
    }

    console.log("🔥 FINAL QUIZ DATA =>", {
      answers,
      score,
      timeTaken: 600 - timeLeft,
    });

    onFinish({
      answers,
      score,
      timeTaken: 600 - timeLeft,
    });
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="relative text-center px-10 py-12 rounded-3xl  bg-white/5 dark:bg-black/20 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 rounded-3xl bg-cyan-500/10 blur-2xl animate-pulse" />
          <div className="relative text-7xl mb-4 animate-bounce drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
            ❓
          </div>
          <h2 className="relative text-2xl font-bold text-gray-800 dark:text-white drop-shadow-lg">
            No Questions Found
          </h2>
          <p className="relative text-sm text-gray-500 mt-2">
            Try selecting another subject or refresh the quiz
          </p>

          <div className="relative flex justify-center gap-2 mt-6">
            <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping shadow-[0_0_10px_#22d3ee]" />
            <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping [animation-delay:150ms] shadow-[0_0_10px_#22d3ee]" />
            <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping [animation-delay:300ms] shadow-[0_0_10px_#22d3ee]" />
          </div>

        </div>
      </div>

    );
  }
  return (
    <div className="md:max-w-3xl w-full flex flex-col gap-4 sm:gap-5">

      <div className="flex items-center justify-between">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm text-textColor hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />

          Back
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full text-xs sm:text-sm font-medium text-gray-400 px-1">

        <div className="flex items-center gap-3 sm:gap-4 w-full sm:max-w-xs">

          <span className="shrink-0">
            Question {currentIndex + 1}/
            {questions.length}
          </span>

          <Progress
            value={progressValue}
            className="h-2 bg-[#191f31] [&>div]:bg-primary-gradient"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-card dark:bg-[#1c1412] text-orange-400 border border-orange-950/60 px-3 py-1.5 rounded-full w-fit">

          <Clock className="w-4 h-4" />

          <span className="font-mono text-xs sm:text-sm">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="custom-surface rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
        <div
          className={`text-xs rounded-full px-3 py-1 mb-5 border w-fit ${getDifficultyStyle(
            currentQuestion?.difficulty
          )}`}
        >
          {currentQuestion?.difficulty}
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 leading-snug">
          {currentQuestion.questionText}
        </h2>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option: string, index: number) => {
            const optionId = ["A", "B", "C", "D"][index];

            const isSelected = selectedOption === optionId;

            const isCorrect =
              option === verifyResult?.correctAnswer;

            let optionStyles = ` border border-slate-200 bg-slate-50 hover:bg-cyan-50 hover:border-cyan-300 dark:border-white/10 dark:bg-[#154249] dark:hover:bg-[#1b5660] dark:hover:border-cyan-400/30 transition-colors duration-200
    `;

            let badgeStyles =
              "bg-primary text-slateText";

            if (isSubmitted) {
              if (isCorrect) {
                optionStyles =
                  "bg-emerald-50 dark:bg-[#0b2920] border-emerald-500/50 text-emerald-400";
                badgeStyles =
                  "bg-emerald-500 text-white";
              }
              else if (
                isSelected &&
                !isCorrect
              ) {
                optionStyles =
                  "bg-red-50 dark:bg-[#291216] border-red-500/40 text-red-400";

                badgeStyles =
                  "bg-red-500 text-white";
              }
            }

            return (
              <button
                key={`${currentQuestion._id}-${index}`}
                disabled={isSubmitted}
                onClick={() =>
                  handleOptionSelect(option)
                }
                className={`w-full text-left p-3 sm:p-4 rounded-xl border flex items-start sm:items-center gap-3 sm:gap-4 transition-all ${optionStyles}`}

              >
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${badgeStyles}`}>
                  {optionId}
                </span>

                <span className="text-sm">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isSubmitted && (
        <div
          className={`rounded-2xl p 4 sm:p-5 border flex flex-col gap-4 shadow-lg transition-all duration-300
          ${verifyResult?.isCorrect
              ? "bg-emerald-50 dark:bg-[#0a201b] border-emerald-200 dark:border-emerald-950/80"
              : "bg-red-50 dark:bg-[#16121e] border-red-200 dark:border-red-950/80"
            } `}
        >
          <div className="flex items-start gap-2">

            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-orange-500" />

            <h4
              className={`font-bold text-sm sm:text-base leading-snug ${verifyResult?.isCorrect
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
                }`}
            >
              {verifyResult?.isCorrect
                ? "Correct! Great job!"
                : "Not quite right"}
            </h4>
          </div>

          <div className="text-xs sm:text-sm space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">

            <div className="flex flex-col gap-2">

              <div className="flex items-center gap-2">
                {verifyResult?.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                )}

                <p className="text-sm">
                  Correct: {verifyResult?.correctAnswer}
                </p>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                Explanation: {verifyResult?.explanation}
              </p>

              <p className="text-sm font-medium text-yellow-600">
                XP Earned: {verifyResult?.xpEarned}
              </p>

            </div>
          </div>
        </div>
      )}

      {isSubmitted && (
        <div className="flex justify-end mt-1 sm:mt-2">

          <Button
            onClick={handleNext}
            className="w-full sm:w-auto"
          >
            {currentIndex + 1 ===
              questions.length
              ? "Finish Quiz"
              : "Next Question"}

            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}