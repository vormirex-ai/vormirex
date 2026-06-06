// ==============================
// FLASHCARD DECK
// ==============================

export interface FlashcardDeck {
  id: string | number;
  title: string;
  totalCards: number;
  dueToday: number;
  progress: number;
  colorClass?: string;
}

// ==============================
// FLASHCARD CARD
// ==============================

export interface FlashcardCard {
  id: string | number;
  question: string;
  answer: string;
  hint?: string;
}

// ==============================
// FLASHCARD STATS
// ==============================

export interface FlashcardStats {
  totalCards: number;
  mastered: number;
  dueToday: number;
  streak: number;
}

// ==============================
// SAVE PROGRESS PAYLOAD
// ==============================

export interface SaveFlashcardProgressPayload {
  cardId: string | number;
  deckId: string | number;
  rating: "wrong" | "close" | "correct";
  attempts?: number;
  userAnswer?: string;
}

// ==============================
// COMPLETE SESSION PAYLOAD
// ==============================

export interface CompleteSessionPayload {
  deckId: string | number;
  correct: number;
  close: number;
  wrong: number;
  totalCards: number;
  timeSpent?: number;
}

// ==============================
// COMPLETE SESSION RESPONSE
// ==============================

export interface CompleteSessionResponse {
  xp: number;
  score: number;
  streak: number;
}

// ==============================
// FLASHCARD PROGRESS RESPONSE
// ==============================

export interface FlashcardProgressResponse {
  success: boolean;
  message: string;
}
