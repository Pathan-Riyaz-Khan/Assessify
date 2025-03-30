import type OptionResponse from "@/types/response/option";
export interface UserQuestionResponse {
  id: number;
  text: string;
  options: OptionResponse[];
  selectedOption: string;
}
