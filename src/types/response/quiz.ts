import type UserQuizResponse from "@/types/response/userQuiz";

export interface QuizResponse {
  id: number;
  title: string;
  description: string;
  accuracy: number;
  userCount: number;
  password: string;
  users: UserQuizResponse[];
  createdDate: Date;
  updatedDate: Date;
  startTime: Date;
  endTime: Date;
  questionCount: number;
}
