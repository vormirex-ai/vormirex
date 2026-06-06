export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
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
