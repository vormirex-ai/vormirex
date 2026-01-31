import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  provider: 'local' | 'google';
  role: 'user' | 'admin' | 'super-admin';
  isVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  timezone?: string;
  isFrozen: boolean;
  streak: {
    current: number;
    longest: number;
    lastActivityDate: Date;
  };
  learningPreferences: {
    dailyGoal: number;
    focusAreas: string[];
  };
  notificationPreferences: {
    streakReminders: boolean;
    newCourseAlerts: boolean;
    securityAlerts: boolean;
  };
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, select: false },
    googleId: { type: String, unique: true, sparse: true, select: false },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    role: { type: String, enum: ['user', 'admin', 'super-admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    isFrozen: { type: Boolean, default: false },
    emailVerificationToken: { type: String, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    timezone: { type: String, default: 'UTC' },
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastActivityDate: { type: Date, default: null },
    },
    learningPreferences: {
      dailyGoal: { type: Number, default: 30 },
      focusAreas: { type: [String], default: [] },
    },
    notificationPreferences: {
      streakReminders: { type: Boolean, default: true },
      newCourseAlerts: { type: Boolean, default: true },
      securityAlerts: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

export default mongoose.model<IUser>('User', userSchema);
