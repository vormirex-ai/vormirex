import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubject extends Document {
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  price: number;
  isPro: boolean;
  hasCertificate: boolean;
  status: 'DRAFT' | 'PUBLISHED';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const subjectSchema = new Schema<ISubject>(
  {
    title: {
      type: String,
      required: [true, 'Subject title is required'],
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
      required: [true, 'Subject description is required'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Subject icon is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      default: 0,
    },
    isPro: {
      type: Boolean,
      default: false,
    },
    hasCertificate: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED'],
      default: 'DRAFT',
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

// Enable text search on title, description, and subtitle
subjectSchema.index({ title: 'text', description: 'text', subtitle: 'text' });

const SubjectModel: Model<ISubject> = mongoose.model<ISubject>(
  'Subject',
  subjectSchema
);

export default SubjectModel;
