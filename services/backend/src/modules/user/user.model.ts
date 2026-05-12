import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  provider: 'local' | 'google';
  role: 'user' | 'admin' | 'super-admin' |'guest';
  isVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  twoFactorCode?: string;
  twoFactorExpires?: Date;
  timezone?: string;
  phoneNumber?: string;
  profilePhoto?: string;
  xp: number;
  isFrozen: boolean;
  streak: {
    current: number;
    longest: number;
    lastActivityDate: Date;
  };
  learningPreferences: {
    educationLevel?: 'School' | 'College' | 'Professional';
    selectedSubjects: string[];
    primaryGoal?: 'Exam Prep' | 'Skill Building' | 'Job Ready' | 'Revision';
    dailyGoal: number;
    focusAreas: string[];
    primaryFocus?: 'Master a skill' | 'Ace an exam' | 'Expand knowledge';
    curiosity?: string[];
    learningPace?: 'Fast track' | 'Balanced' | 'Deep focus';
    learningFormat?: ('Reading' | 'Short videos' | 'Practice and exercise' | 'AI Experience')[];
    challengeLevel?: 'Beginner friendly' | 'Progressive growth' | 'Advanced challenging';
    learningGoals?: ('Job ready' | 'Real Project' | 'Ace Exam' | 'Daily Habit')[];
    currentSkillLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
    timeline?: string;
  };
  notificationPreferences: {
    streakReminders: boolean;
    newCourseAlerts: boolean;
    securityAlerts: boolean;
  };
  privacySettings: {
    isProfilePublic: boolean;
    showProgress: boolean;
    showCourses: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, select: false },
    googleId: { type: String, unique: true, sparse: true, select: false },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    role: { type: String, enum: ['user', 'admin', 'super-admin', 'guest'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    isFrozen: { type: Boolean, default: false },
    xp: { type: Number, default: 0 },
    emailVerificationToken: { type: String, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    twoFactorCode: { type: String, select: false },
    twoFactorExpires: { type: Date, select: false },
    timezone: { type: String, default: 'UTC' },
    phoneNumber: { type: String, required: false },
    profilePhoto: { type: String, required: false },
    
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastActivityDate: { type: Date, default: null },
    },
    learningPreferences: {
      educationLevel: {
        type: String,
        enum: ['School', 'College', 'Professional'],
      },
      selectedSubjects: { 
        type: [String], 
        default: [] 
      },
      primaryGoal: {
        type: String,
        enum: ['Exam Prep', 'Skill Building', 'Job Ready', 'Revision'],
      },
      dailyGoal: { type: Number, default: 30 },
      focusAreas: { type: [String], default: [] },
      primaryFocus: {
        type: String,
        enum: ['Master a skill', 'Ace an exam', 'Expand knowledge'],
      },
      curiosity: { type: [String], default: [] },
      learningPace: {
        type: String,
        enum: ['Fast track', 'Balanced', 'Deep focus'],
      },
      learningFormat: {
        type: [String],
        enum: ['Reading', 'Short videos', 'Practice and exercise', 'AI Experience'],
        default: [],
      },
      challengeLevel: {
        type: String,
        enum: ['Beginner friendly', 'Progressive growth', 'Advanced challenging'],
      },
      learningGoals: {
        type: [String],
        enum: ['Job ready', 'Real Project', 'Ace Exam', 'Daily Habit'],
        default: [],
      },
      currentSkillLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
      },
      timeline: { type: String },
    },
    notificationPreferences: {
      streakReminders: { type: Boolean, default: true },
      newCourseAlerts: { type: Boolean, default: true },
      securityAlerts: { type: Boolean, default: true },
    },
    privacySettings: {
      isProfilePublic: { type: Boolean, default: true },
      showProgress: { type: Boolean, default: true },
      showCourses: { type: Boolean, default: true },
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
