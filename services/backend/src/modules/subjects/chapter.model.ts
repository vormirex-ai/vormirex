import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChapter extends Document {
  subjectId: mongoose.Types.ObjectId;
  title: string;
  sequenceOrder: number;
}

const chapterSchema = new Schema<IChapter>(
  {
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'Subject ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Chapter title is required'],
      trim: true,
    },
    sequenceOrder: {
      type: Number,
      required: [true, 'Sequence order is required'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index for optimized sorting per subject
chapterSchema.index({ subjectId: 1, sequenceOrder: 1 });

const ChapterModel: Model<IChapter> = mongoose.model<IChapter>(
  'Chapter',
  chapterSchema
);

export default ChapterModel;
