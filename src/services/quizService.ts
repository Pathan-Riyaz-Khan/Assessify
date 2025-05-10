import type { QuizRequest } from "@/types/request/quiz";
import type { QuizResponse } from "@/types/response/quiz";

class QuizService {
  baseUrl = import.meta.env.VITE_API_BASE_URL;
  token = localStorage.getItem("token") || "";

  getId(): number {
    if (this.token) {
      const payloadBase64 = this.token.split(".")[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.id;
    }
    return 0;
  }

  async createQuiz(quiz: QuizRequest): Promise<number> {
    try {
      const response = await fetch(this.baseUrl + "quizz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token || "",
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
      const Id = this.getId();
      const response = await fetch(this.baseUrl + "quizz/admin/" + Id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token || "",
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
          Authorization: "Bearer " + this.token || "",
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateQuizz(quiz: QuizRequest, id: number): Promise<void> {
    try {
      const response = await fetch(this.baseUrl + "quizz/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token || "",
          Accept: "application/json",
        },
        body: JSON.stringify(quiz),
      });
      const data = response.json();
      return data;
    } catch (error) {
      throw new Error("Error getting quizz: " + error);
    }
  }
}

export default QuizService;
