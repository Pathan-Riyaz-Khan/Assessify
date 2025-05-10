import type OptionResponse from "@/types/response/option";

export interface QuestionResponse {
  id: number;
  text: string;
  quizId: number;
  options: OptionResponse[];
}
