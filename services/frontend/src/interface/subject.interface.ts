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

export interface SubjectState {
  subjects: any[];
  totalCount: number;
  curriculum: any;
  currentLessonId: string | null;
  nextLessonId: string | null;
  selectedSubjectId: string | null;
  loading: boolean;
  error: string | null;
}

export interface CourseHeaderProps {
  title: string;
  progress: number;
  description: string;
  icon?: string;
  stats: {
    lessons: number;
    duration: string;
    quizzes: number;
    hasCertificate: boolean;
  };
  id?: string;
}
