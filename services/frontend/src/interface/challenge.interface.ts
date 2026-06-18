export interface Question {
  _id: string;
  subjectId: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
  difficulty: string;
}

export interface PastChallenge {
  id: string;
  title: string;
  timeAgo: string;
  category: string;
  xpEarned?: number;
  status: "completed" | "missed";
}

export interface ChallengeHistoryItem {
  _id: string;
  score: number;
  xpEarned: number;
  dateString: string;
  questionsCorrect: number;
  timeSpent: number;
}

export interface ChallengeHomeProps {
  onStart: () => void;
  onViewResult: () => void;
  subjectName: string;
  difficulty: string;
  isCompleted?: boolean;
  todayResult?: any;
}

export type ChallengeStep = "home" | "quiz" | "result";
