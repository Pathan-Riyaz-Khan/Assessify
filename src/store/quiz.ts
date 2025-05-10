import { defineStore } from "pinia";
import type { QuizResponse } from "@/types/response/quiz";

export const useQuizStore = defineStore("app", {
  state: () => ({
    quizzes: [] as QuizResponse[],
  }),

  getters: {
    getQuizzes(): QuizResponse[] {
      return this.quizzes;
    },
  },

  actions: {
    setQuizzes(quizzes: QuizResponse[]): void {
      this.quizzes = quizzes;
    },
  },
});
