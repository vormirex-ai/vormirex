import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITranscriptLine {
  time: string;
  text: string;
}

export interface ILesson extends Document {
  chapterId: mongoose.Types.ObjectId;
  title: string;
  durationMinutes: number;
  videoUrl: string;
  transcript: ITranscriptLine[];
  sequenceOrder: number;
}

const transcriptLineSchema = new Schema(
  {
    time: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

const lessonSchema = new Schema<ILesson>(
  {
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: 'Chapter',
      required: [true, 'Chapter ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true,
    },
    durationMinutes: {
      type: Number,
      required: [true, 'Duration in minutes is required'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    transcript: {
      type: [transcriptLineSchema],
      default: [],
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

// Compound index for sorted queries per chapter
lessonSchema.index({ chapterId: 1, sequenceOrder: 1 });

const LessonModel: Model<ILesson> = mongoose.model<ILesson>(
  'Lesson',
  lessonSchema
);

export default LessonModel;
