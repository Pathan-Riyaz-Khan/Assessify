import type QuizUserResponse from "@/types/response/quizUser";

export interface QuizResponse {
  id: number;
  title: string;
  description: string;
  accuracy: number;
  userCount: number;
  password: string;
  users: QuizUserResponse[];
  createdDate: Date;
  updatedDate: Date;
  startTime: Date;
  endTime: Date;
  questionCount: number;
}
