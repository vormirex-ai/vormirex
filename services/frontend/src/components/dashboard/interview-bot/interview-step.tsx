import React, { useState } from "react";
import { ChevronLeft, RotateCcw, ArrowRight, Lightbulb, Dumbbell, CheckCircle2, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface InterviewStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export function InterviewStep({ onComplete, onBack }: InterviewStepProps) {
  const [answer, setAnswer] = useState("");
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false)

  const questions = [
    {
      id: "Q1",
      type: "Behavioral",
      difficulty: "Medium",
      text: "Describe a situation where you had to meet a very tight deadline. What did you do?",
      tip: "Show prioritization and time management skills.",
      score: "3/10",
      status: "Keep Practicing! 🔄",
      scoreColor: "text-rose-500",
      iconBg: "bg-amber-950/40 border-amber-600/20",
      heading: "What you did well:",
      goodPoints: ["You showed ownership and accountability in your answer."],
      improvementHeading: "Improvements:",
      badPoints: [
        "Use the STAR method: Situation → Task → Action → Result.",
        "Your answer could be more concise — aim for 1.5–2 minutes when speaking."
      ]
    },
    {
      id: "Q2",
      type: "Behavioral",
      difficulty: "Hard",
      text: "Describe a project where you had to work with incomplete or ambiguous requirements.",
      tip: "Show proactive clarification and decision-making.",
      score: "8/10",
      status: "Solid Response! ⚡",
      scoreColor: "text-cyan-400",
      iconBg: "bg-emerald-950/40 border-emerald-600/20",
      heading: "What you did well:",
      goodPoints: [
        "Your answer showed genuine self-awareness and reflection.",
        "You provided a clear, structured response using a logical flow."
      ],
      improvementHeading: "To make it perfect:",
      badPoints: [
        "Try to relate the answer more specifically to the job you're applying for.",
        "Add a specific metric or number to show the impact (e.g., 'increased efficiency by 30%')."
      ]
    }
  ];

  const currentQ = questions[currentQuestionIdx];
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  const handleSubmit = () => {
    if (answer.trim().length > 0) {
      setIsEvaluated(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setAnswer("");
      setIsEvaluated(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-400 px-1">
        <button onClick={onBack} className="flex items-center gap-1 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div>Question {currentQuestionIdx + 1} of 8</div>
        <div className="text-primary font-mono text-sm tracking-wider">
          {currentQuestionIdx === 0 ? "1:13" : "1:37"}
        </div>
      </div>

      <div className="w-full h-1 dark:bg-slate-800 bg-slate-500 rounded-full overflow-hidden">
        <div className="bg-primary-gradient h-full transition-all duration-300" style={{ width: `${((currentQuestionIdx + 1) / 8) * 100}%` }} />
      </div>

      {/* Question Card Box */}
      <Card className="">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="border border-border bg-primary/5 dark:bg-[#154249]/40 text-primary text-[11px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full">
                {currentQ.type}
              </span>
              <span className="text-xs font-mono text-slate-500">{currentQ.id}</span>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${currentQ.difficulty === "Hard"
                ? "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:border-rose-600/30 dark:text-rose-400"
                : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:border-amber-600/30 dark:text-amber-500"
                }`}
            >
              {currentQ.difficulty}
            </span>
          </div>

          <h2 className="text-lg md:text-xl font-bold tracking-tightpt-1">
            {currentQ.text}
          </h2>

          <div className="flex items-center gap-2 border-primary bg-primary/5 dark:bg-[#154249]/40 rounded-lg p-3 text-xs text-textColor border">
            <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{currentQ.tip}</span>
          </div>
        </CardContent>
      </Card>

      {/* Conditional Rendering: Answer Input Screen VS Score Dashboard */}
      {!isEvaluated ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 px-1">
            <span>Your Answer</span>
            <span>{wordCount} words</span>
          </div>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here... Be specific, use examples from your experience."
            className="min-h-[160px] !custom-surface text-slateText dark:text-slate-200 placeholder:text-slate-600 focus-visible:ring-primary text-sm resize-none"
          />
          <div className="flex gap-3">
            <Button onClick={handleSubmit} disabled={answer.trim().length === 0} className="flex-1 font-semibold py-5 rounded-lg text-sm flex items-center justify-center gap-1.5">
              <Send className="w-4 h-4" /> Submit Answer
            </Button>
            <Button onClick={handleNext} variant="secondary" className="px-5 text-sm rounded-lg">
              Skip →
            </Button>
          </div>
        </div>
      ) : (
        /* Realtime Score Feedback Dashboard View */
        <div className="space-y-5">
          <Card>
            <CardContent className="p-6 space-y-4">

              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 pb-4">
                <div className="flex items-center gap-2">

                  <div
                    className={`p-2 rounded-lg border ${currentQ.iconBg}`}
                  >
                    {currentQ.difficulty === "Hard" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    ) : (
                      <Dumbbell className="w-4 h-4 text-amber-200 dark:text-amber-500" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentQ.status}
                    </h3>

                    <p className="text-[11px] text-slate-500 dark:text-slate-500">
                      Score: {currentQ.score}
                    </p>
                  </div>
                </div>

                <div
                  className={`text-2xl font-black font-mono ${currentQ.scoreColor}`}
                >
                  {currentQ.score}
                </div>
              </div>


              <div className="bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50 rounded-lg p-4 space-y-2">
                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {currentQ.heading}
                </h4>

                <ul className="text-xs text-slate-700 dark:text-slate-300 list-disc list-inside pl-1 space-y-1">
                  {currentQ.goodPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>


              <div className="bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40 rounded-lg p-4 space-y-2">
                <h4 className="text-xs font-bold text-amber-700 dark:text-amber-500 flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block mr-0.5" />
                  {currentQ.improvementHeading}
                </h4>

                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside pl-1">
                  {currentQ.badPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleNext} className="flex-1 font-semibold py-5 rounded-lg text-sm flex items-center justify-center gap-1">
              Next Question <ArrowRight className="w-4 h-4" />
            </Button>
            <Button onClick={() => setIsDeleted(false)} variant="secondary" className="px-4 text-xs rounded-lg">
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}