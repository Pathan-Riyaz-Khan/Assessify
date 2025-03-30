export interface QuizRequest {
  Title: string;
  Description: string;
  AdminId: number;
  Password: string;
  StartTime: Date;
  EndTime: Date;
}
