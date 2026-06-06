export interface DeckProps {
  title: string;
  totalCards: number;
  dueToday: number;
  progress: number;
  colorClass: string;
}

export interface FlashcardStageProps {
  question: string;
  answer: string;
  hint?: string;
  onNext: () => void;
  onReview: (type: "wrong" | "close" | "correct") => void;
}
