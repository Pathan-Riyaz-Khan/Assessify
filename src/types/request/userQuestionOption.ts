import type { UserOptionRequest } from "./userOption";

export interface UserQuestionOptionRequest {
  QuizId: number;
  Options: UserOptionRequest[];
}
