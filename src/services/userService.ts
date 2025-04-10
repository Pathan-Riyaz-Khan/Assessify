import type { UserRequest } from "@/types/request/user";
import type { UserResponse } from "@/types/response/user";
import type { UserQuestionResponse } from "@/types/response/userQuestion";
import type { AuthResponse } from "@/types/response/auth";
import type { UserQuizResponse } from "@/types/response/userQuiz";
import type { UserQuestionOptionRequest } from "@/types/request/userQuestionOption";
import type { tokenResponse } from "@/types/request/token";
class UserService {
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

  async GetUser(): Promise<UserResponse> {
    try {
      const Id = this.getId();
      const response = await fetch(this.baseUrl + "user/" + Id, {
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
      throw new Error("Error getting user: " + error);
    }
  }

  async UpdateUser(Name: string, Email: string): Promise<void> {
    try {
      const Id = this.getId();
      await fetch(this.baseUrl + "user/" + Id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token || "",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: Name, email: Email }),
      });
    } catch (error) {
      throw new Error("Error updating user: " + error);
    }
  }

  async GetQuiz(Id: number): Promise<UserQuizResponse> {
    try {
      const response = await fetch(this.baseUrl + "user/quiz/" + Id, {
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
      throw new Error("Error getting quiz: " + error);
    }
  }

  async GetUserAttemptedQuestions(
    quizId: number
  ): Promise<UserQuestionResponse[]> {
    try {
      const Id = this.getId();
      const response = await fetch(
        this.baseUrl + "user/" + Id + "/UserOption?quizId=" + quizId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token || "",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error getting user questions: " + error);
    }
  }

  async signUp(user: UserRequest): Promise<void> {
    try {
      await fetch(this.baseUrl + "user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token || "",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      throw new Error("Error adding admin: " + error);
    }
  }

  async login(user: AuthResponse): Promise<tokenResponse> {
    try {
      const response = await fetch(this.baseUrl + "user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error("Error logging in: " + error);
    }
  }

  async JoinQuiz(id: number, password: string): Promise<number> {
    try {
      const response = await fetch(
        this.baseUrl + "user/GetQuiz?Id=" + id + "&Password=" + password,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token || "",
            Accept: "application/json",
          },
        }
      );
      const data = response.json();
      return data;
    } catch (error) {
      throw new Error("Error in finding Quiz " + error);
    }
  }

  async UserQuestionOptions(
    userQuestionOptions: UserQuestionOptionRequest
  ): Promise<void> {
    try {
      const Id = this.getId();
      await fetch(this.baseUrl + "user/" + Id + "/UserOption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token || "",
          Accept: "application/json",
        },
        body: JSON.stringify(userQuestionOptions),
      });
    } catch (error) {
      throw new Error("Error in adding UserOptions" + error);
    }
  }

  ClearAuth() {
    const token = localStorage.getItem("token");
    if (token) localStorage.removeItem("token");
    if (window.location.href != window.location.origin + "/") {
      window.location.href = window.location.origin + "/";
    }
  }
}
export default UserService;
