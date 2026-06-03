import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IActiveLesson {
  lessonId: mongoose.Types.ObjectId;
  secondsWatched: number;
  lastAccessedAt: Date;
}

export interface ISubjectProgress extends Document {
  userId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  completedLessons: mongoose.Types.ObjectId[];
  activeLessons: IActiveLesson[];
  totalStudyTimeSeconds: number;
  createdAt: Date;
  updatedAt: Date;
}

const activeLessonSchema = new Schema(
  {
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    secondsWatched: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    lastAccessedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { _id: false }
);

const subjectProgressSchema = new Schema<ISubjectProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'Subject ID is required'],
    },
    completedLessons: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
      default: [],
    },
    activeLessons: {
      type: [activeLessonSchema],
      default: [],
    },
    totalStudyTimeSeconds: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Enforce unique record per user per subject
subjectProgressSchema.index({ userId: 1, subjectId: 1 }, { unique: true });

const SubjectProgressModel: Model<ISubjectProgress> =
  mongoose.model<ISubjectProgress>('SubjectProgress', subjectProgressSchema);

export default SubjectProgressModel;
