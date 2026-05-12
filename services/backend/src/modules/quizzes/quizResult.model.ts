import mongoose, { Document, Schema } from 'mongoose';

export interface IQuizResult extends Document {
  userId: mongoose.Types.ObjectId;
  subjectId: string;
  score: number; // Percentage 0-100
  totalQuestions: number;
  timeTaken: number; // Seconds
  xpEarned: number;
  answers: {
    questionId: mongoose.Types.ObjectId;
    selectedOption: string;
    isCorrect: boolean;
  }[];
  createdAt: Date;
}

const quizResultSchema = new Schema<IQuizResult>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    subjectId: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    xpEarned: { type: Number, default: 0 },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'QuizQuestion', required: true },
        selectedOption: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IQuizResult>('QuizResult', quizResultSchema);
