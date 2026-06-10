type SubjectType = {
  _id: string;
  title: string;
  description?: string;
  icon: string;
  lessonsCount?: number;
};
type AnswerType = {
  questionId: string;
  selectedOption: string;
  isCorrect?: boolean;
};

type FinishQuizParams = {
  answers: AnswerType[];
  score: number;
  timeTaken: number;
};
