import mongoose, { Document, Schema } from 'mongoose';

export interface IFlashcard extends Document {
  deckId: mongoose.Types.ObjectId;
  question: string;
  answer: string;
  hint?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: Date;
  updatedAt: Date;
}

const flashcardSchema = new Schema<IFlashcard>(
  {
    deckId: { type: Schema.Types.ObjectId, ref: 'FlashcardDeck', required: true, index: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    hint: { type: String },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' }
  },
  { timestamps: true }
);

export default mongoose.model<IFlashcard>('Flashcard', flashcardSchema);
