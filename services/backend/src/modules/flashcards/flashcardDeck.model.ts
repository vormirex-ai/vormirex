import mongoose, { Document, Schema } from 'mongoose';

export interface IFlashcardDeck extends Document {
  name: string;
  subjectId: string;
  subjectName: string;
  totalCards: number;
  icon?: string;
  creatorId?: mongoose.Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const flashcardDeckSchema = new Schema<IFlashcardDeck>(
  {
    name: { type: String, required: true },
    subjectId: { type: String, required: true, index: true },
    subjectName: { type: String, required: true },
    totalCards: { type: Number, default: 0 },
    icon: { type: String },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    isPublic: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IFlashcardDeck>('FlashcardDeck', flashcardDeckSchema);
