export interface Subject {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  isPro: boolean;
  price: number;
  progressPercentage: number;
  totalLessons: number;
  lessonsDone: number;
  totalStudyTimeSeconds: number;
  userStatus: string;
  hasCertificate: boolean;
  tags: string[];
}

export interface SubjectCardProps {
  _id: string;
  title: string;
  icon: string;
  topics: number;
  lessons: number;
  progress: number;
  timeStudied: string;
  status: string;
  color: string;
  description?: string;
  subtitle?: string;
  isPro?: boolean;
  price?: number;
  tags?: string[];
  hasCertificate?: boolean;
}
