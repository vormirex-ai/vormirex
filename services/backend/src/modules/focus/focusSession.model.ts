import mongoose, { Document, Schema } from 'mongoose';

export interface IFocusSession extends Document {
  userId: mongoose.Types.ObjectId;
  taskId?: mongoose.Types.ObjectId;
  type: 'focus' | 'short-break' | 'long-break';
  durationMinutes: number;
  completedAt: Date;
}

const focusSessionSchema = new Schema<IFocusSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'FocusTask', required: false },
    type: {
      type: String,
      enum: ['focus', 'short-break', 'long-break'],
      required: true,
    },
    durationMinutes: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IFocusSession>('FocusSession', focusSessionSchema);
