import { defineStore } from "pinia";
import type { QuestionResponse } from "@/types/response/question";

export const useQuestionStore = defineStore("question", {
  state: () => ({
    questions: [] as QuestionResponse[],
  }),

  getters: {
    getQuestions: (state) => (): QuestionResponse[] => {
      return state.questions || [];
    },
  },

  actions: {
    setQuestions(questions: QuestionResponse[]): void {
      this.questions = questions;
    },
  },
});
