import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { FlashcardReviewActions } from "./flashcard-review-action";
import { FlashcardStageProps } from "@/interface/flashCrad.interface";

export const FlashcardStage = ({
  question,
  answer,
  hint,
  onNext,
  onReview,
}: FlashcardStageProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleReviewSelect = (type: "wrong" | "close" | "correct") => {
    onReview(type);

    setIsFlipped(false);
    setUserAnswer("");
    setShowHint(false);

    setTimeout(() => {
      onNext();
    }, 300);
  };
  return (
    <div className="max-w-2xl mx-auto mt-10">

      <div className="perspective-[1200px]">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7 }}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="relative min-h-[300px]"
        >

          <Card
            className="absolute inset-0 border border-primary/20 bg-card p-12 
      text-center rounded-3xl shadow-sm flex flex-col justify-center"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <span className="text-primary uppercase tracking-widest text-xs font-bold mb-4">
              Mathematics
            </span>

            <h2 className="text-2xl font-bold text-foreground">
              {question}
            </h2>
          </Card>

          {/* Back Side */}
          <Card
            className="absolute inset-0 border border-primary/20 bg-card p-12 
      text-center rounded-3xl shadow-sm flex flex-col justify-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <span className="text-emerald-500 uppercase tracking-widest text-xs font-bold mb-4">
              Answer
            </span>

            <h2 className="text-2xl font-bold text-foreground">
              {answer}
            </h2>

            <p className="text-sm text-muted-foreground mt-4">
              {hint}
            </p>
          </Card>

        </motion.div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Label className="text-sm text-muted-foreground">
          Write your answer first
        </Label>

        <Button
          variant="outline"
          onClick={() => setShowHint(!showHint)}
          className="text-xs rounded-md px-3 py-1 border-border text-primary hover:bg-muted"
        >
          💡 Hint
        </Button>
      </div>

      {showHint && (
        <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10 dark:bg-yellow-500/10 light:bg-yellow-100 p-4">
          <p className="text-xs uppercase tracking-widest text-yellow-600 dark:text-yellow-400 font-semibold mb-2">
            Hint
          </p>

          <p className="text-sm text-yellow-700 dark:text-yellow-100/90">
            {hint}
          </p>
        </div>
      )}

      {!isFlipped ? (
        <div className="mt-4 space-y-4">
          <Textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here before flipping..."
            className="bg-background border-border text-foreground min-h-[120px] focus-visible:ring-1 focus-visible:ring-primary"
          />

          <Button
            className="w-full rounded-xl h-11"
            onClick={() => setIsFlipped(true)}
          >
            Check Answer
          </Button>
        </div>
      ) : (
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 dark:bg-blue-950/10 p-5">
              <p className="text-[10px] uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 mb-3">
                Your Answer
              </p>

              <p className="text-sm text-muted-foreground italic">
                {userAnswer || "(no answer written)"}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/10 p-5">
              <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                Correct Answer
              </p>

              <p className="text-sm font-semibold text-foreground">
                {answer}
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            How close was your answer?
          </p>
          <FlashcardReviewActions onSelect={handleReviewSelect} />
        </div>
      )}
    </div>
  );
};