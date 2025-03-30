import { defineStore } from "pinia";
import type { UserResponse } from "@/types/response/user";
import type { UserQuestionResponse } from "@/types/response/userQuestion";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as UserResponse,
    userAttemtedQuestions: [] as UserQuestionResponse[],
  }),
  getters: {
    getUser(): UserResponse {
      return this.user;
    },
    getUserAttemptedQuestions(): UserQuestionResponse[] {
      return this.userAttemtedQuestions;
    },
  },
  actions: {
    setUser(user: UserResponse): void {
      this.user = user;
    },
    setUserAttemptedQuestions(
      userAttemtedQuestions: UserQuestionResponse[]
    ): void {
      this.userAttemtedQuestions = userAttemtedQuestions;
    },
  },
});
