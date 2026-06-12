import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudyLog extends Document {
  userId: mongoose.Types.ObjectId;
  dateString: string; // YYYY-MM-DD
  secondsStudied: number;
  createdAt: Date;
  updatedAt: Date;
}

const studyLogSchema = new Schema<IStudyLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    dateString: { type: String, required: true },
    secondsStudied: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

// Compound index to guarantee only one study log per user per day
studyLogSchema.index({ userId: 1, dateString: 1 }, { unique: true });

const StudyLogModel: Model<IStudyLog> = mongoose.model<IStudyLog>('StudyLog', studyLogSchema);

export default StudyLogModel;
