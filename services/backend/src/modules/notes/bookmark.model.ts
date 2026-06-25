import mongoose, { Schema, Document } from 'mongoose';

export interface IBookmark extends Document {
  userId: mongoose.Types.ObjectId;
  noteId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  noteId: { type: Schema.Types.ObjectId, ref: 'Note', required: true, index: true }
}, { timestamps: { createdAt: true, updatedAt: false } });

// Ensure unique index so a user cannot bookmark the same note multiple times
bookmarkSchema.index({ userId: 1, noteId: 1 }, { unique: true });

export default mongoose.model<IBookmark>('Bookmark', bookmarkSchema);
