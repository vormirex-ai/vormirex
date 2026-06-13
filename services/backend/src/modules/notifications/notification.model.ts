import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'achievement' | 'lesson' | 'reminder' | 'ai_recommendation' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  metadata?: {
    xpEarned?: number;
    lessonId?: string;
    subjectId?: string;
    actionUrl?: string;
    scheduleTime?: Date;
  };
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['achievement', 'lesson', 'reminder', 'ai_recommendation', 'system'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false, index: true },
    metadata: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
);

// Indexes to speed up queries by type and read status per user
notificationSchema.index({ userId: 1, type: 1 });
notificationSchema.index({ userId: 1, isRead: 1 });

export default mongoose.model<INotification>('Notification', notificationSchema);
