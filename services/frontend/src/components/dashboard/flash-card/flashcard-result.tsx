
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";

interface FlashCardResultProps {
  onBackToDecks: () => void;
}

export const FlashCardResult = ({
  onBackToDecks,
}: FlashCardResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-[40vh] items-center justify-center px-3 sm:px-4"
    >
      <div className="w-full max-w-2xl p-4 sm:p-6 md:p-10 text-center">

        <div className="mb-4 sm:mb-6 flex justify-center text-4xl sm:text-5xl">
          👍
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
          Deck Complete!
        </h2>

        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400">
          5 cards reviewed
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">

          <div className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-emerald-500 dark:text-emerald-400">
            <Check size={16} className="sm:w-[18px] sm:h-[18px]" />
            Easy: 1
          </div>

          <div className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-yellow-500 dark:text-yellow-400">
            <Circle
              size={14}
              className="sm:w-4 sm:h-4"
              fill="currentColor"
            />
            OK: 4
          </div>

          <div className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-red-500 dark:text-red-400">
            <Circle
              size={14}
              className="sm:w-4 sm:h-4"
              fill="currentColor"
            />
            Hard: 0
          </div>
        </div>

        <h3 className="mt-8 sm:mt-10 text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-500 dark:text-cyan-400">
          Score: 60%
        </h3>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button className="rounded-xl h-11 sm:h-12 text-sm sm:text-base px-5 shadow-none hover:shadow-md">
            Review Again
          </Button>

          <Button
            variant="secondary"
            className="rounded-xl h-11 sm:h-12 text-sm sm:text-base px-5"
            onClick={onBackToDecks}
          >
            Back to Decks
          </Button>
        </div>
      </div>
    </motion.div>
  );
};