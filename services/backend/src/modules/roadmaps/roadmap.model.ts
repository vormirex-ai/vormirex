import mongoose, { Document, Schema } from 'mongoose';

export interface IMilestone {
  weekNumber: number;
  title: string;
  description: string;
  topicsCovered: string[];
  isCompleted: boolean;
}

export interface IRoadmap extends Document {
  userId: mongoose.Types.ObjectId;
  status: 'active' | 'completed' | 'abandoned';
  summary: {
    durationWeeks: number;
    totalSubjects: number;
    dailyGoalMinutes: number;
    selectedSubjects: string[];
  };
  milestones: IMilestone[];
  createdAt: Date;
  updatedAt: Date;
}

const milestoneSchema = new Schema<IMilestone>({
  weekNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  topicsCovered: { type: [String], default: [] },
  isCompleted: { type: Boolean, default: false }
});

const roadmapSchema = new Schema<IRoadmap>(
  {
    // A user currently only has one active master roadmap at a time
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, 
    status: { type: String, enum: ['active', 'completed', 'abandoned'], default: 'active' },
    summary: {
      durationWeeks: { type: Number, required: true },
      totalSubjects: { type: Number, required: true },
      dailyGoalMinutes: { type: Number, required: true },
      selectedSubjects: { type: [String], default: [] }
    },
    milestones: [milestoneSchema]
  },
  { timestamps: true }
);

export default mongoose.model<IRoadmap>('Roadmap', roadmapSchema);
