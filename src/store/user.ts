import { defineStore } from "pinia";
import type { UserResponse } from "@/types/response/user";
import type { UserQuestionResponse } from "@/types/response/userQuestion";
import type { UserQuizResponse } from "@/types/response/userQuiz";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as UserResponse,
    userAttemtedQuestions: [] as UserQuestionResponse[],
    quiz: {} as UserQuizResponse,
  }),
  getters: {
    getUser(): UserResponse {
      return this.user;
    },
    getUserAttemptedQuestions(): UserQuestionResponse[] {
      return this.userAttemtedQuestions;
    },
    getQuiz(): UserQuizResponse {
      return this.quiz;
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
    setUserQuiz(userQuiz: UserQuizResponse): void {
      this.quiz = userQuiz;
    },
  },
});
