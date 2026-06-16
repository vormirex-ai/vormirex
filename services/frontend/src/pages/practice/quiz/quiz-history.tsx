import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useGetQuizHistoryQuery,
  useGetQuizHistoryBySubjectQuery,
  useGetQuizStatsQuery,
} from "@/store/api/quizzesApi";
import { useGetSubjectsQuery } from "@/store/api/subjectsApi";
import { fadeUpItem } from "@/lib/motion";
import QuizHistoryCard from "@/components/dashboard/quiz/quiz-history/quiz-history-card";
import HistoryHeader from "@/components/dashboard/quiz/quiz-history/quiz-history-header";
import QuizHistoryStatsCards from "@/components/dashboard/quiz/quiz-history/quiz-history-stats-cards";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";


export default function QuizHistoryPage() {
  const [searchParams] = useSearchParams();
  const subjectFromUrl = searchParams.get("subject") || "all";
  const [selectedSubject, setSelectedSubject] = useState(subjectFromUrl);
  const isSubjectView = !!searchParams.get("subject");
  const { data: stats } = useGetQuizStatsQuery({});

  const { data: allHistoryData, isLoading: allLoading } =
    useGetQuizHistoryQuery(undefined, {
      skip: selectedSubject !== "all",
    });

  const {
    data: subjectHistoryData,
    isLoading: subjectLoading,
  } = useGetQuizHistoryBySubjectQuery(
    selectedSubject,
    {
      skip: selectedSubject === "all",
    }
  );

  const { data: subjectsData } = useGetSubjectsQuery({ page: 1, limit: 50});
  const subjects = subjectsData?.subjects || subjectsData?.data ||
    [];

  const allHistory = allHistoryData?.history || [];

  const historyList = isSubjectView
    ? subjectHistoryData?.history || []
    : selectedSubject === "all"
      ? allHistory : allHistory.filter((item: any) =>item.subjectId === selectedSubject );

  const isLoading = isSubjectView ? subjectLoading : allLoading;
  const statsData = stats?.stats || stats || {};

  const getSubjectName = (id: string) => {
    const found = subjects.find(
      (s: any) => s._id === id
    );

    return found?.title || "Unknown Subject";
  };

  const handleSubjectChange = ( value: string) => {
    setSelectedSubject(value);
  };

    useEffect(() => {
    setSelectedSubject(subjectFromUrl);
  }, [subjectFromUrl]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        <AppSkeletonCard variant="quiz-history" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-10">
      <motion.div
        variants={fadeUpItem}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl space-y-8"
      >
        <HistoryHeader
          isSubjectView={isSubjectView}
          selectedSubject={selectedSubject}
          subjects={subjects}
          handleSubjectChange={handleSubjectChange}
        />

        <QuizHistoryStatsCards
          statsData={statsData}
          getSubjectName={getSubjectName}
        />

        <div className="space-y-5">
          {historyList.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-14 text-center">
              <h2 className="text-xl font-semibold">
                No Quiz History Found
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Start solving quizzes
              </p>
            </div>
          ) : (
            historyList.map((quiz: any) => (
              <QuizHistoryCard
                key={quiz._id}
                quiz={quiz}
                subjectName={getSubjectName(
                  quiz.subjectId
                )}
              />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}