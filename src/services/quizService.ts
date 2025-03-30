import type { QuizRequest } from "@/types/request/quiz";
import type { QuizResponse } from "@/types/response/quiz";

class QuizService {
  baseUrl = import.meta.env.VITE_API_BASE_URL;
  async createQuiz(quiz: QuizRequest): Promise<number> {
    try {
      const response = await fetch(this.baseUrl + "quizz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(quiz),
      });
      const data = response.json();
      return data;
    } catch (error) {
      throw new Error("Error adding quiz: " + error);
    }
  }

  async GetQuizzes(): Promise<QuizResponse[]> {
    try {
      const response = await fetch(this.baseUrl + "quizz/admin/2", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error getting quizz: " + error);
    }
  }

  async DeleteQuizz(id: number): Promise<void> {
    try {
      await fetch(this.baseUrl + "quizz/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default QuizService;
