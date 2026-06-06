import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { useState } from "react";

import QuizStart from "@/components/dashboard/quiz/quiz-start";
import QuizCard from "@/components/dashboard/quiz/quiz-card";
import QuizResult from "@/components/dashboard/quiz/quiz-result";

const DUMMY_QUESTIONS = [
  {
    id: 1,
    question:
      "Which of the following is the correct formula for Integration by Parts?",
    options: [
      { id: "A", text: "∫u dv = uv + ∫v du" },
      { id: "B", text: "∫u dv = uv - ∫v du" },
      { id: "C", text: "∫u dv = u²v - ∫v du" },
      { id: "D", text: "∫u dv = uv - ∫u dv" },
    ],
    correctAnswer: "B",
    explanation:
      "The Integration by Parts formula is ∫u dv = uv - ∫v du.",
  },
  {
    id: 2,
    question:
      "Using the LIATE rule, what should you choose as 'u' when evaluating ∫x · ln(x) dx?",
    options: [
      { id: "A", text: "u = x" },
      { id: "B", text: "u = ln(x)" },
      { id: "C", text: "u = x · ln(x)" },
      { id: "D", text: "Either can be chosen" },
    ],
    correctAnswer: "B",
    explanation:
      "According to LIATE, Logarithm comes before Algebraic.",
  },
];

export default function QuizPage() {
  const [step, setStep] = useState("start");
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setScore(0);
    setStep("quiz");
  };

  const finishQuiz = (finalScore: number) => {
    setScore(finalScore);
    setStep("result");
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center p-1 lg:p-10 antialiased">

      <AnimatePresence mode="wait">

        {step === "start" && (
          <motion.div
            key="start"
            variants={containerStagger(0.12)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div variants={fadeUpItem}>
              <QuizStart
                onStart={startQuiz}
                totalQuestions={5}
              />
            </motion.div>
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div
            key="quiz"
            variants={containerStagger(0.12)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div variants={fadeUpItem}>
              <QuizCard
                questions={DUMMY_QUESTIONS}
                onFinish={finishQuiz}
                onBack={() => setStep("start")}
              />
            </motion.div>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            variants={containerStagger(0.12)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div variants={fadeUpItem}>
              <QuizResult
                score={score}
                total={5}
                onRetake={startQuiz}
              />
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}