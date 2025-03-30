<template>
  <div v-if="!quizItems.length">
    <quiz-not-found :notFoundObject="notFoundMessage" />
  </div>
  <div v-else class="quiz-list-container">
    <v-virtual-scroll :items="quizzes" class="quiz-scroll">
      <template v-slot:default="{ item }">
        <v-card
          :key="item.id"
          max-width="100%"
          elevation="4"
          class="d-flex flex-row align-center pa-4 mb-2"
        >
          <!-- Card Image -->
          <v-img
            src="@/assets/q.jpg"
            alt="Quiz Image"
            max-height="50%"
            max-width="50%"
            aspect-ratio="4/3"
            cover
          />

          <v-card-text class="flex-grow-1">
            <v-card-title>{{ item.title }}</v-card-title>
            <div class="d-flex">
              <v-chip color="primary" class="me-2">{{
                item.questionCount + " Questions"
              }}</v-chip>

              <v-chip color="primary" class="me-4" style="text-transform: none">
                {{ "Code - " + item.id }}
              </v-chip>
              <v-chip color="primary" style="text-transform: none">
                {{ "Password - " + item.password }}
              </v-chip>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              icon="mdi-pencil-outline"
              @click="navigateToQuestions(item.id)"
            />
            <v-btn icon="mdi-delete" @click="deleteQuizRequest(item.id)" />
          </v-card-actions>
        </v-card>
      </template>
    </v-virtual-scroll>
    <v-dialog v-model="quizDeletionDialog" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-alert-circle-outline"
        variant="flat"
      >
        <v-card-text>
          {{ $t("messages.questionDeletionAlert") }}
        </v-card-text>

        <template v-slot:actions>
          <v-btn
            text="cancel"
            variant="tonal"
            style="text-transform: none"
            @click="quizDeletionDialog = false"
          />
          <v-btn
            style="text-transform: none"
            text="Delete"
            variant="tonal"
            @click="deleteQuiz(selectedQuizId)"
          />
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
interface Quiz {
  id: number;
  title: string;
  noOfQuestions: string;
  password: string;
}

import QuizNotFound from "@/pages/quizPages/QuizNotFound.vue";
import { useQuizStore } from "@/store/quiz";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import QuizService from "@/services/quizService";

const { t } = useI18n();
const quizStore = useQuizStore();

const quizzes = computed(() => quizStore.quizzes);
const quizItems = computed<Quiz[]>(() => {
  return quizzes.value.map((quiz) => {
    return {
      id: quiz.id,
      title: quiz.title,
      noOfQuestions: quiz.questionCount + " Questions",
      password: quiz.password,
    };
  });
});

const notFoundMessage = {
  notFoundMsg: t("messages.createdNotFound"),
  subTitle: t("messages.createdNotFoundSubTitle"),
};

const router = useRouter();

const navigateToQuestions = function (Id: number) {
  router.push({ path: "/quizzes/questions", query: { quizId: Id } });
};

const selectedQuizId = ref(0);
const quizDeletionDialog = ref(false);

const deleteQuizRequest = (id: number) => {
  quizDeletionDialog.value = true;
  selectedQuizId.value = id;
};
const quizService = new QuizService();
const deleteQuiz = async function (id: number) {
  quizDeletionDialog.value = false;
  try {
    await quizService.DeleteQuizz(id).then(() => {
      quizStore.quizzes = quizStore.quizzes.filter((quiz) => quiz.id !== id);
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.v-card-text {
  margin-right: 1rem;
}
.quiz-list-container {
  max-height: 500px;
  overflow-y: auto; /* Enables scroll when needed */
}
</style>
