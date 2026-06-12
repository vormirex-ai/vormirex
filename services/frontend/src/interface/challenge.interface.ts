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

export type ChallengeStep = "home" | "quiz" | "result";
