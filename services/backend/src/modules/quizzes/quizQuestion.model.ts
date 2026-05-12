import mongoose, { Document, Schema } from 'mongoose';

export interface IQuizQuestion extends Document {
  subjectId: string;
  questionText: string;
  options: string[]; 
  correctAnswer: string;
  explanation?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const quizQuestionSchema = new Schema<IQuizQuestion>(
  {
    subjectId: { type: String, required: true, index: true },
    questionText: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: [
        (val: string[]) => val.length === 4,
        '{PATH} must have exactly 4 options'
      ]
    },
    correctAnswer: { type: String, required: true },
    explanation: { type: String },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' }
  },
  { timestamps: true }
);

export default mongoose.model<IQuizQuestion>('QuizQuestion', quizQuestionSchema);
