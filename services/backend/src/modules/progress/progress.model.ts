import { Schema, model, Document, Types } from 'mongoose';

export interface IProgress extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  completedLessons: Types.ObjectId[];
  grade?: number; // 0-100 or scale
  status: 'enrolled' | 'completed' | 'dropped';
  enrolledAt: Date;
  completedAt?: Date;
}

const progressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }], // Assuming Lesson model exists or will exist. If not, can be just strings for now.
    grade: { type: Number, min: 0, max: 100 },
    status: { 
      type: String, 
      enum: ['enrolled', 'completed', 'dropped'], 
      default: 'enrolled' 
    },
    enrolledAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

// Prevent duplicate enrollment
progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Progress = model<IProgress>('Progress', progressSchema);

export default Progress;
