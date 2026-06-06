export interface TimelineItem {
  day: string;
  title: string;
  duration: string;
  completed?: boolean;
  active?: boolean;
}

export type GoalType =
  | "master"
  | "exam"
  | "job"
  | "interview"
  | "competitive"
  | "custom";

export type LevelType = "beginner" | "intermediate" | "advanced";

export type TimeLine =
  | "30 Minutes"
  | "1 Hour"
  | "2 Hours"
  | "3+ Hours"
  | "Custom";

export type PaceType = "comfortable" | "balanced" | "fast";

export type PreferenceType =
  | "video-lessons"
  | "reading-material"
  | "ai-tutor"
  | "practice-problems"
  | "quizzes"
  | "flashcards"
  | "projects"
  | "mock-tests";
