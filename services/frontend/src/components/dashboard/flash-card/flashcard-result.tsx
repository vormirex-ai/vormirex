
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";

interface FlashCardResultProps {
  onBackToDecks: () => void;
  data?: any;
}

export const FlashCardResult = ({
  onBackToDecks,
  data,
}: FlashCardResultProps) => {
  const result = data?.data;
  const summary = result?.summary;
  const score = result?.session?.score;
  const xpEarned = result?.xpEarned;
  const newTotalXp = result?.newTotalXp;

  const totalCards = result?.session?.results?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-[40vh] items-center justify-center px-3 sm:px-4"
    >
      <div className="w-full max-w-2xl p-4 sm:p-6 md:p-10 text-center">

        <div className="mb-4 text-5xl">🎉</div>

        <h2 className="text-2xl font-bold text-primary">
          Deck Complete!
        </h2>

        <p className="mt-2 text-base text-slate-500">
          {totalCards} cards reviewed
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-500">
            ✅ Easy: {summary?.easy ?? 0}
          </div>

          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-yellow-500">
            🤨 OK: {summary?.ok ?? 0}
          </div>

          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-500">
            ❌ Hard: {summary?.hard ?? 0}
          </div>
        </div>

        <h3 className="mt-8 text-4xl font-bold text-cyan-500">
          Score: {score}%
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          <span className="text-yellow-600">+{xpEarned}</span>   XP earned | Total XP: <span className="text-yellow-600">{newTotalXp}
          </span>
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button className="rounded-xl">Review Again</Button>

          <Button variant="secondary" onClick={onBackToDecks}>
            Back to Decks
          </Button>
        </div>
      </div>
    </motion.div>
  );
};