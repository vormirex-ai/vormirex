import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle2, XCircle, Lightbulb, ArrowRight, ArrowLeft, } from "lucide-react";

export default function QuizCard({
  questions,
  onFinish,
  onBack,
}: {
  questions: any;
  onFinish: any;
  onBack: any;
}) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(588);

  const currentQuestion = questions[currentIndex] || questions[0];
  const progressValue = ((currentIndex + 1) / 5) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optionId: any) => {
    if (isSubmitted) return;
    setSelectedOption(optionId);
    setIsSubmitted(true);

    if (optionId === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      onFinish(3);
    }
  };

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
            Question {currentIndex + 1}/5
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
        <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">

          <span className="bg-border text-slateText dark:bg-purple-950/60 dark:text-purple-400 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border border-purple-900/30">
            Integration
          </span>

          <span className="bg-border text-slateText dark:bg-blue-950/60 dark:text-blue-400 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border border-blue-900/30">
            Medium
          </span>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-6 leading-snug">
          {currentQuestion.question}
        </h2>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option: any) => {
            const isSelected = selectedOption === option.id;
            const isCorrect =
              option.id === currentQuestion.correctAnswer;

            let optionStyles = `
  border border-slate-200 
  bg-slate-50 
  hover:bg-cyan-50 
  hover:border-cyan-300
  dark:border-white/10 
  dark:bg-[#154249] 
  dark:hover:bg-[#1b5660] 
  dark:hover:border-cyan-400/30
  transition-colors duration-200
`;

            let badgeStyles =
              "bg-primary text-slateText";

            if (isSubmitted) {
              if (isCorrect) {
                optionStyles =
                  "bg-emerald-50 dark:bg-[#0b2920] border-emerald-500/50 text-emerald-400";

                badgeStyles =
                  "bg-emerald-500 text-white";
              } else if (isSelected && !isCorrect) {
                optionStyles =
                  "bg-red-50 dark:bg-[#291216] border-red-500/40 text-red-400";

                badgeStyles =
                  "bg-red-500 text-white";
              } else {
                optionStyles =
                  "bg-[#151a29]/40 opacity-40 border-transparent";
              }
            } else if (isSelected) {
              optionStyles =
                "bg-[#1a253e] border-blue-500 text-blue-400";
            }

            return (
              <button
                key={option.id}
                disabled={isSubmitted}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full text-left p-3 sm:p-4 rounded-xl border flex items-start sm:items-center gap-3 sm:gap-4 transition-all ${optionStyles}`}
              >
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${badgeStyles}`}
                >
                  {option.id}
                </span>

                <span className="font-medium text-sm sm:text-[15px] leading-relaxed break-words">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {isSubmitted && (
        <div
          className={`rounded-2xl p-4 sm:p-5 border flex flex-col gap-4 shadow-lg transition-all duration-300
      ${selectedOption === currentQuestion.correctAnswer
              ? "bg-emerald-50 dark:bg-[#0a201b] border-emerald-200 dark:border-emerald-950/80"
              : "bg-red-50 dark:bg-[#16121e] border-red-200 dark:border-red-950/80"
            }`}
        >
          <div className="flex items-start gap-2">

            <Lightbulb
              className={`w-5 h-5 shrink-0 mt-0.5 ${selectedOption === currentQuestion.correctAnswer
                ? "text-amber-500"
                : "text-orange-500"
                }`}
            />

            <h4
              className={`font-bold text-sm sm:text-base leading-snug ${selectedOption === currentQuestion.correctAnswer
                ? "text-emerald-700 dark:text-white"
                : "text-red-700 dark:text-white"
                }`}
            >
              {selectedOption === currentQuestion.correctAnswer
                ? "Correct! Great job!"
                : "Not quite right"}
            </h4>
          </div>

          <div className="text-xs sm:text-sm space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">

            {selectedOption ===
              currentQuestion.correctAnswer ? (
              <p className="flex items-start gap-2">

                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />

                <span>
                  <strong>Correct!</strong>{" "}
                  {currentQuestion.explanation}
                </span>
              </p>
            ) : (
              <>
                <p className="flex items-start gap-2 text-red-600 dark:text-red-400">

                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />

                  <span>
                    <strong>Not quite!</strong> The correct
                    answer is{" "}
                    <strong>
                      u =
                      {currentQuestion.correctAnswer === "B"
                        ? "ln(x)"
                        : ""}
                    </strong>
                    .
                  </span>
                </p>

                <p className="flex items-start gap-2 sm:pl-6">

                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />

                  <span>
                    <strong>Correct!</strong>{" "}
                    {currentQuestion.explanation}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {isSubmitted && (
        <div className="flex justify-end mt-1 sm:mt-2">
          <Button
            onClick={handleNext}
            className="w-full sm:w-auto"
          >
            Next Question
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}