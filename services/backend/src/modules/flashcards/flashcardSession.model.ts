import mongoose, { Document, Schema } from 'mongoose';

export interface IFlashcardSession extends Document {
  userId: mongoose.Types.ObjectId;
  deckId: mongoose.Types.ObjectId;
  score: number; // Percentage
  xpEarned: number;
  results: {
    cardId: mongoose.Types.ObjectId;
    rating: 'wrong' | 'close' | 'correct';
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const flashcardSessionSchema = new Schema<IFlashcardSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    deckId: { type: Schema.Types.ObjectId, ref: 'FlashcardDeck', required: true },
    score: { type: Number, required: true },
    xpEarned: { type: Number, required: true },
    results: [
      {
        cardId: { type: Schema.Types.ObjectId, ref: 'Flashcard', required: true },
        rating: { type: String, enum: ['wrong', 'close', 'correct'], required: true }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IFlashcardSession>('FlashcardSession', flashcardSessionSchema);
