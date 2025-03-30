import type { UserRequest } from "@/types/request/user";
import type { UserResponse } from "@/types/response/user";
import type { UserQuestionResponse } from "@/types/response/userQuestion";
import type { AuthResponse } from "@/types/response/auth";
class UserService {
  baseUrl = import.meta.env.VITE_API_BASE_URL;

  async GetUser(Id: number): Promise<UserResponse> {
    try {
      const response = await fetch(this.baseUrl + "user/" + Id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error getting user: " + error);
    }
  }

  async GetUserAttemptedQuestions(
    Id: number,
    quizId: number
  ): Promise<UserQuestionResponse[]> {
    try {
      const response = await fetch(
        this.baseUrl + "user/" + Id + "/UserOption?quizId=" + quizId,
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
      throw new Error("Error getting user questions: " + error);
    }
  }

  async signUp(user: UserRequest): Promise<void> {
    try {
      await fetch(this.baseUrl + "user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      throw new Error("Error adding admin: " + error);
    }
  }

  async login(user: AuthResponse): Promise<{ status: number }> {
    try {
      const response = await fetch(this.baseUrl + "user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });

      return { status: response.status };
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
}
export default UserService;
