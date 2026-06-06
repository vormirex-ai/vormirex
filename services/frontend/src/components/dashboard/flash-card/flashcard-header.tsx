import { Button } from "@/components/ui/button";

export const FlashCardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2 flex-wrap">
          <span>🎴</span>
          <span>Flashcards</span>
        </h1>

        <p className="text-sm md:text-base text-textColor max-w-xl leading-relaxed">
          AI-generated flashcards with spaced repetition.
        </p>
      </div>

      <Button className="w-full sm:w-auto h-11 px-5 rounded-xl shrink-0">
        AI Generate Cards
      </Button>
    </div>
  );
};