import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  userId?: mongoose.Types.ObjectId;      // Null if platform/admin note
  title: string;
  content?: string;                       // Markdown or text preview content
  subjectId?: mongoose.Types.ObjectId;    // Reference to Subject model
  subjectName?: string;                   // E.g. Mathematics, Chemistry
  isBookmarked: boolean;
  isPrivate: boolean;
  fileUrl?: string;                       // Uploaded file on Cloudinary
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false, index: true },
  title: { type: String, required: true },
  content: { type: String, required: false },
  subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: false, index: true },
  subjectName: { type: String, required: false },
  isBookmarked: { type: Boolean, default: false, index: true },
  isPrivate: { type: Boolean, default: false, index: true },
  fileUrl: { type: String, required: false }
}, { timestamps: true });

noteSchema.index({ userId: 1, title: 'text', content: 'text', subjectName: 'text' });

export default mongoose.model<INote>('Note', noteSchema);
