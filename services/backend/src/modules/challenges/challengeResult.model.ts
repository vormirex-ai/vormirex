import mongoose, { Document, Schema } from 'mongoose';

export interface IChallengeResult extends Document {
  userId: mongoose.Types.ObjectId;
  dateString: string; // YYYY-MM-DD
  score: number; // percentage (0-100)
  xpEarned: number;
  timeSpent: number; // total time in seconds
  questionsCorrect: number;
  answers: {
    questionId: mongoose.Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
    timeToAnswer: number; // milliseconds
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const challengeResultSchema = new Schema<IChallengeResult>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    dateString: { type: String, required: true },
    score: { type: Number, required: true },
    xpEarned: { type: Number, required: true },
    timeSpent: { type: Number, required: true },
    questionsCorrect: { type: Number, required: true },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'QuizQuestion', required: true },
        selectedOption: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        timeToAnswer: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

// Enforce one attempt per user per day
challengeResultSchema.index({ userId: 1, dateString: 1 }, { unique: true });

export default mongoose.model<IChallengeResult>('ChallengeResult', challengeResultSchema);
