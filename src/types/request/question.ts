import type { OptionRequest } from "./option";
export interface QuestionRequest {
  Text: string;
  Options: OptionRequest[];
}
