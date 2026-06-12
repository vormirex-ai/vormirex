import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import QuizStart from "@/components/dashboard/quiz/quiz-start";
import QuizCard from "@/components/dashboard/quiz/quiz-card";
import QuizResult from "@/components/dashboard/quiz/quiz-result";
import { useGetSubjectsQuery } from "@/store/api/subjectsApi";
import { useGetQuizQuestionsQuery, useSubmitQuizMutation } from "@/store/api/quizzesApi";
import { DynamicIcon } from "@/components/iconMapper";
import { SubjectSkeletonCard } from "@/components/skeleton/SubjectSkeletonCard";
import { QuizHeader } from "@/components/dashboard/quiz/quiz-header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";

export default function QuizPage() {
  const navigate = useNavigate(); const { subjectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep =
    (searchParams.get("step") as
      | "subjects"
      | "start"
      | "quiz"
      | "result") || "subjects";

  const [step, setStep] = useState<"subjects" | "start" | "quiz" | "result">(currentStep);
  const [score, setScore] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | null>(null);
  const [quizResult, setQuizResult] = useState<any>(null);
  const { data, isLoading, isError } = useGetSubjectsQuery({ page: 1, limit: 20 });
  const subjects = data?.subjects || data?.data || [];
  const {
    data: quizData,
    isLoading: quizLoading,
  } = useGetQuizQuestionsQuery(selectedSubject?._id, {
    skip: !selectedSubject?._id,
  });

  const [submitQuiz] = useSubmitQuizMutation();
  const quiz = quizData || {};
  const questions = quiz?.questions || [];

  const updateStep = (
    newStep:
      | "subjects"
      | "start"
      | "quiz"
      | "result"
  ) => {
    setStep(newStep);

    setSearchParams({
      step: newStep,
    });
  };

  const handleSubjectSelect = (subject: SubjectType) => {
    setSelectedSubject(subject);

    navigate(
      `/practice/quiz/${subject._id}?step=start`);
    updateStep("start");
  };


  const startQuiz = () => {
    setScore(0);
    setQuizResult(null);
    updateStep("quiz");
  };

  const finishQuiz = async ({
    answers,
    score,
    timeTaken,
  }: FinishQuizParams) => {
    try {
      if (!selectedSubject?._id) {
        console.log(" No subject selected");
        return;
      }
      const payload = {
        subjectId: selectedSubject._id.toString(),
        timeTaken: Number(timeTaken),
        answers: answers.map((a: AnswerType) => ({
          questionId: a.questionId.toString(),
          selectedOption: String(a.selectedOption),
        })),
      };

      const response = await submitQuiz(payload).unwrap();
      toast.success(response?.message || "Quiz submitted successfully");
      setScore(score);
      setQuizResult(response);
      updateStep("result");
    } catch (error: any) {
      console.error(" API ERROR =>", error);
      toast.error(error?.data?.message || "Quiz submit failed");
    }
  };

  useEffect(() => {
    if (subjectId && subjects.length > 0) {
      const foundSubject = subjects.find(
        (item: SubjectType) => item._id === subjectId,
      );

      if (foundSubject) {
        setSelectedSubject(foundSubject);
        updateStep("start");
      }
    }
  }, [subjectId, subjects]);

  return (
    <div className="flex p-4 lg:p-10">
      <AnimatePresence mode="wait">

        {step === "subjects" && (
          <motion.div
            key="subjects"
            variants={containerStagger(0.12)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <motion.div variants={fadeUpItem} className="mb-12 text-center">
              <QuizHeader />
            </motion.div>

            {isLoading && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <SubjectSkeletonCard key={i} />
                ))}
              </div>
            )}

            {isError && (
              <div className="flex justify-center">
                <div className="text-lg text-red-400">
                  Failed to load subjects
                </div>
              </div>
            )}

            {!isLoading && !isError && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {subjects.map((subject: SubjectType) => (
                  <motion.div
                    key={subject._id}
                    variants={fadeUpItem}
                    whileHover={{
                      y: -6,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="group relative overflow-hidden rounded-[28px] border border-border bg-card p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                    <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:scale-125" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/60 text-primary shadow-sm backdrop-blur-xl">
                          <DynamicIcon
                            icon={subject.icon}
                            className="h-8 w-8"
                          />
                        </div>

                        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          Quiz
                        </div>
                      </div>
                      <div className="mt-6">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                          {subject.title}
                        </h2>

                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {subject.description ||
                            "Practice important concepts and improve your learning progress."}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <button
                          onClick={() =>
                            navigate(
                              `/practice/quiz/quiz-history?subject=${subject._id}`
                            )
                          }
                          className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm font-medium text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                        >
                          View History
                        </button>

                        <button
                          onClick={() =>
                            handleSubjectSelect(subject)
                          }
                          className="group/button flex items-center gap-3 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
                        >
                          Start Quiz

                          <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                            →
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === "start" && (
          <motion.div
            key="start"
            variants={containerStagger(0.12)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <div className="mb-6 flex w-full">
              <Button
                variant="secondary"
                onClick={() => updateStep("subjects")}
              >
                ← Back To Subjects
              </Button>
            </div>

            <motion.div
              variants={fadeUpItem}
              className="mx-auto flex w-full max-w-4xl items-center justify-center"
            >
              <QuizStart
                subject={selectedSubject}
                onStart={startQuiz}
                totalQuestions={quiz?.totalQuestions ?? questions.length}
                timeLimit={quiz?.timeLimit ?? 0}
                xpReward={quiz?.totalXpReward ?? 0}
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
            className="w-full"
          >
            <motion.div
              variants={fadeUpItem}
              className="mx-auto flex w-full max-w-4xl items-center justify-center"
            >
              {quizLoading ? (
                <div className="text-center py-20 max-w-4xl ">
                  <AppSkeletonCard variant="quiz" />
                </div>
              ) : (
                <QuizCard
                  questions={questions}
                  onFinish={finishQuiz}
                  onBack={() => setStep("start")}
                />
              )}
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
            className="w-full"
          >
            <motion.div
              variants={fadeUpItem}
              className="mx-auto flex w-full max-w-4xl items-center justify-center"
            >
              <QuizResult
                score={quizResult?.result?.score || score}
                total={
                  quizResult?.result?.totalQuestions ||
                  questions.length
                }
                xp={quizResult?.xpEarned || 0}
                accuracy={quizResult?.result?.score || 0}
                timeTaken={
                  quizResult?.result?.timeTaken || 0
                }
                onRetake={startQuiz}
                onGoSubjects={() => {
                  navigate("/practice/quiz");
                  updateStep("subjects");
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
