import mongoose, { Schema, Document } from 'mongoose';

export interface IXpLog extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  reason: string;
  createdAt: Date;
}

const xpLogSchema = new Schema<IXpLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

// Compound index for querying a user's logs within specific date ranges
xpLogSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IXpLog>('XpLog', xpLogSchema);
