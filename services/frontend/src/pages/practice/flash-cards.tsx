import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUpItem } from "@/lib/motion";
import { StatCard } from "@/components/dashboard/dashboard-home/dashboard-stats-cards";
import { DeckCategoryCard } from "@/components/dashboard/flash-card/deck-category-card";
import { FlashcardStage } from "@/components/dashboard/flash-card/flashcard-stage";
import { FlashCardHeader } from "@/components/dashboard/flash-card/flashcard-header";
import { FlashCardResult } from "@/components/dashboard/flash-card/flashcard-result";
import { Button } from "@/components/ui/button";

import {
  useGetFlashcardDecksQuery,
  useGetDueCardsQuery,
  useGetDeckCardsQuery,
  useGetFlashcardStatsQuery,
  useCompleteFlashcardSessionMutation,
} from "@/store/api/flashcardsApi";

import { statConfig } from "@/components/dashboard/flash-card/stat-config";
import { useEffect, useMemo, useState } from "react";
import { AppSkeletonCard } from "@/components/skeleton/card-skeleton";

export default function FlashcardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get("step") || 1);
  const currentIndex = Number(searchParams.get("index") || 0);
  const selectedDeck = searchParams.get("deck") || "";
  const [results, setResults] = useState<{ cardId: string; rating: "wrong" | "close" | "correct" }[]>([]);
  const [sessionResult, setSessionResult] = useState<any>(null);

  // -----api ----------------
  const { data: decksData, isLoading: decksLoading } = useGetFlashcardDecksQuery();
  const { data: statsData, isLoading: statsLoading } = useGetFlashcardStatsQuery();
  const [completeSession] = useCompleteFlashcardSessionMutation();
  const { data: dueCardsData } = useGetDueCardsQuery(selectedDeck, { skip: !selectedDeck, });
  const { data: deckCardsData } = useGetDeckCardsQuery(selectedDeck, { skip: !selectedDeck, });



  const cards = useMemo(() => {
    if (selectedDeck && dueCardsData?.length) {
      return dueCardsData.map((d: any) => d.card);
    }
    if (selectedDeck && deckCardsData?.cards?.length) {
      return deckCardsData.cards;
    }

    return [];
  }, [dueCardsData, deckCardsData, selectedDeck]);

  const currentCard = cards?.[currentIndex];

  const goToStep = (newStep: number, index = 0, deck = selectedDeck) => {
    setSearchParams({
      step: String(newStep),
      index: String(index),
      deck: deck || "",
    });
  };

  const handleNext = async (lastCardResult?: {
    cardId: string;
    rating: "wrong" | "close" | "correct";
  }) => {
    if (lastCardResult) {
      setResults((prev) => [...prev, lastCardResult]);
    }

    if (currentIndex < cards.length - 1) {
      goToStep(2, currentIndex + 1, selectedDeck);
    } else {
      try {
        const finalResults = lastCardResult
          ? [...results, lastCardResult]
          : results;

        const response = await completeSession({
          deckId: selectedDeck,
          results: finalResults,
        });
        setSessionResult(response)

        // console.log("SESSION DONE:", response);

        goToStep(3, 0, selectedDeck);
      } catch (err) {
        console.error("Session complete error:", err);
      }
    }
  };

  useEffect(() => {
    if (cards.length && currentIndex >= cards.length) {
      goToStep(2, 0, selectedDeck);
    }
  }, [cards.length]);

  return (
    <div className="min-h-screen p-1 lg:p-10">
      <div className="mx-auto space-y-10">

        {step === 1 && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FlashCardHeader />
            </motion.div>

            <motion.div variants={fadeUpItem}>
              {statsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <AppSkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {statsData &&
                    Object.entries(statsData).map(([key, value]) => {
                      const config = statConfig[key];
                      if (!config) return null;
                      const Icon = config.icon;

                      return (
                        <StatCard
                          key={key}
                          title={config.label}
                          value={value}
                          icon={Icon}
                          iconBg={config.iconBg}
                          iconColor={config.iconColor}
                        />
                      );
                    })}
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeUpItem}>
              {decksLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <AppSkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {decksData?.map((deck: any) => {
                    const isCompleted =
                      deck.dueCardsCount === 0 &&
                      deck.cardsStudied >= deck.totalCards;

                    const progressValue = deck.totalCards
                      ? Math.min(
                        Math.round((deck.cardsStudied / deck.totalCards) * 100),
                        100
                      )
                      : 0;

                    return (
                      <div
                        key={deck._id}
                        onClick={() => {
                          if (isCompleted) return;
                          goToStep(2, 0, deck._id);
                        }}
                        className={isCompleted ? "cursor-not-allowed" : "cursor-pointer"}
                      >
                        <DeckCategoryCard
                          title={deck.name}
                          totalCards={deck.totalCards}
                          dueToday={deck.dueCardsCount}
                          studied={deck.cardsStudied}
                          icon={deck.icon}
                          accuracy={deck.averageAccuracy}
                          disabled={isCompleted}
                          progress={progressValue}
                          colorClass="bg-blue-500"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-6">

              <Button onClick={() => goToStep(1)} variant="secondary">
                ← Back
              </Button>

              <p className="text-sm text-muted-foreground">
                Card {currentIndex + 1} of {cards.length}
              </p>

              {currentCard && (
                <FlashcardStage
                  question={currentCard.question}
                  answer={currentCard.answer}
                  hint={currentCard.hint}
                  cardId={currentCard._id}
                  deckId={selectedDeck}
                  onNext={handleNext}
                />
              )}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <FlashCardResult
            data={sessionResult}
            onBackToDecks={() =>
              setSearchParams({ step: "1", index: "0", deck: "" })
            }

          />
        )}
      </div>
    </div>
  );
}