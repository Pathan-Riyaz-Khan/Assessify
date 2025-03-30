import type { QuestionRequest } from "@/types/request/question";
import type { QuestionResponse } from "@/types/response/question";
class QuestionService {
  baseUrl = import.meta.env.VITE_API_BASE_URL;
  async GetQuestions(quizId: number): Promise<QuestionResponse[]> {
    try {
      const response = await fetch(
        this.baseUrl + "quizzes/" + quizId + "/question",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error getting questions: " + error);
    }
  }

  async AddQuestion(
    quizId: number,
    question: QuestionRequest
  ): Promise<number> {
    try {
      const response = await fetch(
        this.baseUrl + "quizzes/" + quizId + "/question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(question),
        }
      );
      const data = response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error("Error getting " + error);
    }
  }

  async UpdateQuestion(
    quizId: number,
    question: QuestionRequest,
    id: number
  ): Promise<void> {
    try {
      const response = await fetch(
        this.baseUrl + "quizzes/" + quizId + "/question/" + id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(question),
        }
      );
      const data = response.json();
      return data;
    } catch (error) {
      throw new Error("Error getting " + error);
    }
  }

  async DeleteQuestion(quizId: number, Id: number): Promise<void> {
    try {
      await fetch(this.baseUrl + "quizzes/" + quizId + "/question/" + Id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    } catch (error) {
      throw new Error("Error deleting Question " + error);
    }
  }
}

export default QuestionService;
