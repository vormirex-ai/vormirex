import mongoose, { Document, Schema } from 'mongoose';

export interface IFocusTask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  subjectId?: mongoose.Types.ObjectId;
  taskType: 'lesson' | 'quiz' | 'practice' | 'reading' | 'notes' | 'revision' | 'coding' | 'lab' | 'exam';
  description?: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  status: 'active' | 'next' | 'upcoming' | 'completed' | 'skipped';
  order?: number;
  date?: Date;
  durationMinutes: number;
  xpAwarded: number;
  createdAt: Date;
  updatedAt: Date;
}

const focusTaskSchema = new Schema<IFocusTask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: false },
    taskType: {
      type: String,
      enum: ['lesson', 'quiz', 'practice', 'reading', 'notes', 'revision', 'coding', 'lab', 'exam'],
      default: 'practice',
    },
    description: { type: String, required: false },
    estimatedPomodoros: { type: Number, default: 1 },
    completedPomodoros: { type: Number, default: 0 },
    dueDate: { type: Date, required: false },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['active', 'next', 'upcoming', 'completed', 'skipped'],
      default: 'upcoming',
    },
    order: { type: Number, default: 0 },
    date: { type: Date, required: false, index: true },
    durationMinutes: { type: Number, default: 30 },
    xpAwarded: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export default mongoose.model<IFocusTask>('FocusTask', focusTaskSchema);
