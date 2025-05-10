import type { QuizResponse } from "./quiz";
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  quizzes: QuizResponse[];
  createdAt: string;
  updatedAt: string;
}
