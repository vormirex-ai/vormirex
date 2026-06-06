import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpItem } from "@/lib/motion";

import {
  ChallengeStep,
  PastChallenge,
  Question,
} from "@/interface/challenge.interface";

import { ChallengeHome } from "@/components/dashboard/daily-challanges/challenge-home";
import { ChallengeQuiz } from "@/components/dashboard/daily-challanges/challenge-quiz";
import { ChallengeResult } from "@/components/dashboard/daily-challanges/challenge-result";
import { ChallengesHeaders } from "@/components/dashboard/daily-challanges/challenges-header";



const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "What is the value of x in: 2x + 6 = 18?",
    options: ["4", "5", "6", "7"],
    correctAnswerIndex: 2,
    explanation:
      "Subtract 6 from both sides to get 2x = 12, then divide by 2 to get x = 6.",
  },
  {
    id: "q2",
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correctAnswerIndex: 2,
    explanation:
      "Mars appears red due to iron oxide (rust) on its surface.",
  },
  {
    id: "q3",
    text: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswerIndex: 1,
    explanation:
      "Hexa- is a Greek prefix meaning six.",
  },
];

const MOCK_PAST_CHALLENGES: PastChallenge[] = [
  {
    id: "p1",
    title: "What is Newton's Second Law?",
    timeAgo: "Yesterday",
    category: "Physics",
    xpEarned: 150,
    status: "completed",
  },
  {
    id: "p2",
    title: "Evaluate ∫x·eˣ dx using IBP",
    timeAgo: "2 days ago",
    category: "Mathematics",
    xpEarned: 150,
    status: "completed",
  },
  {
    id: "p3",
    title: "Python: What does __init__ do?",
    timeAgo: "3 days ago",
    category: "Python",
    status: "missed",
  },
];

export default function DailyChallengePage() {
  const [step, setStep] = useState<ChallengeStep>("home");
  const [finalScore, setFinalScore] = useState(0);
  const [finalAccuracy, setFinalAccuracy] = useState(0);

  const handleQuizFinish = (
    score: number,
    accuracy: number
  ) => {
    setFinalScore(score);
    setFinalAccuracy(accuracy);

    setStep("result");
  };


  return (
    <div className="min-h-screen p-1 lg:p-10">
      <div className="mx-auto space-y-10">

        <AnimatePresence mode="wait">

          {step === "home" && (
            <motion.div
              key="home"
              variants={fadeUpItem}
              initial="hidden"
              animate="show"
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.25 },
              }}
            >
              <ChallengesHeaders />

              <ChallengeHome
                streakDays={12}
                pastChallenges={MOCK_PAST_CHALLENGES}
                onStart={() => setStep("quiz")}
              />
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div
              key="quiz"
              variants={fadeUpItem}
              initial="hidden"
              animate="show"
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.25 },
              }}
            >
              <ChallengeQuiz
                questions={MOCK_QUESTIONS}
                onFinish={handleQuizFinish}
              />
            </motion.div>
          )}


          {step === "result" && (
            <motion.div
              key="result"
              variants={fadeUpItem}
              initial="hidden"
              animate="show"
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.25 },
              }}
            >
              <ChallengeResult
                score={finalScore}
                accuracy={finalAccuracy}
                onRetry={() => setStep("quiz")}
                onExit={() => setStep("home")}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

