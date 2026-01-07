import mongoose, { Schema, Document, Model } from 'mongoose';

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface ICourseModule {
  title: string;
  items: string[];
}

export interface ICourseLevelBlock {
  level: CourseLevel;
  duration?: string;
  highlights: string[];
  modules: ICourseModule[];
}

export interface ICourse extends Document {
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  thumbnail: string;
  instructorId: mongoose.Types.ObjectId;
  level: CourseLevel;
  levels: ICourseLevelBlock[]; // Rich curriculum structure
  status: CourseStatus;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Sub-schema for individual modules (chapters)
const courseModuleSchema = new Schema(
  {
    title: { type: String, required: true },
    items: { type: [String], default: [] },
  },
  { _id: false } // No need for separate IDs for sub-documents if not referenced directly
);

// Sub-schema for course levels (Foundation/Advanced)
const courseLevelSchema = new Schema(
  {
    level: {
      type: String,
      enum: Object.values(CourseLevel),
      required: true,
    },
    duration: { type: String },
    highlights: { type: [String], default: [] },
    modules: { type: [courseModuleSchema], default: [] },
  },
  { _id: false }
);

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [200, 'Subtitle cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Instructor ID is required'],
      index: true,
    },
    // Keep 'level' for backward compatibility or top-level filtering, 
    // but the real data is now in the 'levels' array.
    level: {
      type: String,
      enum: Object.values(CourseLevel),
      default: CourseLevel.BEGINNER,
    },
    // New nested structure for curriculum
    levels: {
      type: [courseLevelSchema],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.DRAFT,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseSchema.index({ title: 'text', description: 'text', subtitle: 'text' });

const CourseModel: Model<ICourse> = mongoose.model<ICourse>(
  'Course',
  courseSchema
);

export default CourseModel;
