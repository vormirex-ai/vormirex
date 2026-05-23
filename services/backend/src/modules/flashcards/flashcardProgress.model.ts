import mongoose, { Document, Schema } from 'mongoose';

export interface IFlashcardProgress extends Document {
  userId: mongoose.Types.ObjectId;
  cardId: mongoose.Types.ObjectId;
  deckId: mongoose.Types.ObjectId;
  lastRating?: 'wrong' | 'close' | 'correct';
  attempts: number;
  userAnswer?: string;
  nextReviewDate: Date;
  lastReviewed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const flashcardProgressSchema = new Schema<IFlashcardProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    cardId: { type: Schema.Types.ObjectId, ref: 'Flashcard', required: true },
    deckId: { type: Schema.Types.ObjectId, ref: 'FlashcardDeck', required: true, index: true },
    lastRating: { type: String, enum: ['wrong', 'close', 'correct'] },
    attempts: { type: Number, default: 0 },
    userAnswer: { type: String },
    nextReviewDate: { type: Date, required: true, index: true },
    lastReviewed: { type: Date }
  },
  { timestamps: true }
);

// Compound index to quickly find a user's progress on a specific card
flashcardProgressSchema.index({ userId: 1, cardId: 1 }, { unique: true });

export default mongoose.model<IFlashcardProgress>('FlashcardProgress', flashcardProgressSchema);
