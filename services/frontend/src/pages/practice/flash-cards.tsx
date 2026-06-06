import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUpItem } from "@/lib/motion";
import { StatCard } from "@/components/dashboard/dashboard-home/dashboard-stats-cards";
import { DeckCategoryCard } from "@/components/dashboard/flash-card/deck-category-card";
import { FlashcardStage } from "@/components/dashboard/flash-card/flashcard-stage";
import { FlashCardHeader } from "@/components/dashboard/flash-card/flashcard-header";
import { FlashCardResult } from "@/components/dashboard/flash-card/flashcard-result";

import {
  CheckCircle2,
  Flame,
  Layers3,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FlashcardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get("step") || 1);
  const currentIndex = Number(searchParams.get("index") || 0);
  const selectedDeck = searchParams.get("deck") || "";

  const flashcards = useMemo(() => {
    return [
      {
        question: "What is Euler's number (e)?",
        answer: "2.71828",
        hint: "Base of natural logarithm",
      },
      {
        question: "What is PI value?",
        answer: "3.14159",
        hint: "Used in circles",
      },
      {
        question: "Newton Second Law?",
        answer: "F = ma",
        hint: "Force equation",
      },
    ];
  }, []);

  const progress =
    ((currentIndex + 1) / flashcards.length) * 100;


  const goToStep = (newStep: number, index = 0, deck = selectedDeck) => {
    setSearchParams({
      step: String(newStep),
      index: String(index),
      deck: deck || "",
    });
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      goToStep(2, currentIndex + 1);
    } else {
      goToStep(3, 0);
    }
  };

  return (
    <div className="min-h-screen p-1 lg:p-10">
      <div className="mx-auto space-y-10">

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FlashCardHeader />
            </motion.div>

            <motion.div variants={fadeUpItem}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <StatCard
                  title="Total Cards"
                  value={156}
                  icon={Layers3}
                  iconBg="bg-blue-500/10"
                  iconColor="text-blue-400"
                />

                <StatCard
                  title="Mastered"
                  value={89}
                  icon={CheckCircle2}
                  iconBg="bg-emerald-500/10"
                  iconColor="text-emerald-400"
                />

                <StatCard
                  title="Due Today"
                  value={34}
                  icon={RefreshCcw}
                  iconBg="bg-orange-500/10"
                  iconColor="text-orange-400"
                />

                <StatCard
                  title="Day Streak"
                  value={7}
                  icon={Flame}
                  iconBg="bg-red-500/10"
                  iconColor="text-red-400"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUpItem}>
              <div
                className=" grid  grid-cols-1  sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4  gap-4 sm:gap-5 md:gap-6"
              >
                <div
                  onClick={() => goToStep(2, 0, "Mathematics")}
                  className="cursor-pointer w-full"
                >
                  <DeckCategoryCard
                    title="Mathematics"
                    totalCards={48}
                    dueToday={12}
                    progress={70}
                    colorClass="bg-blue-500"
                  />
                </div>

                <div
                  onClick={() => goToStep(2, 0, "Python")}
                  className="cursor-pointer w-full"
                >
                  <DeckCategoryCard
                    title="Python"
                    totalCards={62}
                    dueToday={18}
                    progress={40}
                    colorClass="bg-pink-500"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* ================= STEP 2 ================= */}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-8">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Button
                  onClick={() => goToStep(1, 0)}
                  className="text-sm border-none rounded-lg w-full sm:w-auto"
                  variant="secondary"
                >
                  ← Back to Decks
                </Button>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left whitespace-nowrap">
                    Card {currentIndex + 1} of {flashcards.length}
                  </p>

                  <div className="w-full sm:w-[160px] h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-primary"
                    />
                  </div>

                </div>
              </div>

              <FlashcardStage
                question={flashcards[currentIndex].question}
                answer={flashcards[currentIndex].answer}
                hint={flashcards[currentIndex].hint}
                onNext={handleNext}
                onReview={(type) => {
                  console.log("Review:", type);
                }}
              />
            </div>
          </motion.div>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FlashCardResult
              onBackToDecks={() => {
                setSearchParams({
                  step: "1",
                  index: "0",
                  deck: "",
                });
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}