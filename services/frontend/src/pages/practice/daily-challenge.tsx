import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpItem } from "@/lib/motion";
import {
  ChallengeStep,
  Question,
} from "@/interface/challenge.interface";
import { ChallengeHome } from "@/components/dashboard/daily-challanges/challenge-home";
import { ChallengeQuiz } from "@/components/dashboard/daily-challanges/challenge-quiz";
import { ChallengeResult } from "@/components/dashboard/daily-challanges/challenge-result";
import { ChallengesHeaders } from "@/components/dashboard/daily-challanges/challenges-header";

import {
  useGetTodayChallengeQuery
} from "@/store/api/challengesApi";

import { useGetSubjectsQuery } from "@/store/api/subjectsApi";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";

export default function DailyChallengePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = (searchParams.get("step") as ChallengeStep) || "home";
  const updateStep = (newStep: ChallengeStep) => {
    setSearchParams({ step: newStep });
  };
  const [finalScore, setFinalScore] = useState(0);
  const [finalAccuracy, setFinalAccuracy] = useState(0);

  const {
    data: todayChallenge,
    isLoading: todayLoading,
    error: todayError,
  } = useGetTodayChallengeQuery();

  const { data: subjectsResponse, } = useGetSubjectsQuery();

  const questions: Question[] =
    Array.isArray(todayChallenge?.questions) ? todayChallenge.questions : [];

  const firstQuestion = questions[0];

  const subjects = Array.isArray(subjectsResponse)
    ? subjectsResponse
    : subjectsResponse?.subjects || [];

  const matchedSubject = subjects.find(
    (sub: any) =>
      sub._id === firstQuestion?.subjectId
  );

  const subjectName = matchedSubject?.title || "Unknown Subject";
  const difficulty = firstQuestion?.difficulty || "Beginner";
  const isTodayCompleted = todayChallenge?.completed;
  const todayResult = todayChallenge?.challengeResult;

  const handleStart = () => {
    if (isTodayCompleted) return;
    updateStep("quiz");
  };

  const handleQuizFinish = (
    score: number,
    accuracy: number
  ) => {
    setFinalScore(score);
    setFinalAccuracy(accuracy);

    updateStep("result");
  };


  if (todayLoading) {
    return (
      <div className="min-h-screen my-10 flex flex-col gap-7">
        <AppSkeletonCard />
        <AppSkeletonCard />
        <AppSkeletonCard />
      </div>
    );
  }

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
              exit={{ opacity: 0, y: -20 }}
            >
              <ChallengesHeaders />

              <ChallengeHome
                subjectName={subjectName}
                difficulty={difficulty}
                onStart={handleStart}
                isCompleted={isTodayCompleted}
                todayResult={todayResult}
              />
            </motion.div>
          )}


          {step === "quiz" && (
            <motion.div
              key="quiz"
              variants={fadeUpItem}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
            >
              <ChallengeQuiz
                questions={questions}
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
              exit={{ opacity: 0, y: -20 }}
            >
              <ChallengeResult
                score={finalScore}
                accuracy={finalAccuracy}
                onRetry={() =>
                  updateStep("quiz")
                }
                onExit={() =>
                  updateStep("home")
                }
              />
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}