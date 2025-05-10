<template>
  <div v-if="!quizItems.length">
    <quiz-not-found :notFoundObject="notFoundMessage" />
  </div>
  <div v-else class="quiz-list-container">
    <v-row class="align-center justify-space-between">
      <v-col v-for="item in quizItems" :key="item.id" cols="12" sm="6" md="6">
        <v-card elevation="10" rounded="true" class="ma-2" max-width="350">
          <v-toolbar color="transparent">
            <v-toolbar-title class="text-h6 text-primary" :text="item.title" />

            <template v-slot:append>
              <v-btn
                icon="mdi-square-edit-outline"
                @click="updateQuiz(item.id)"
              />
            </template>
          </v-toolbar>
          <v-card-text class="text-primary text-center font-weight-bold">
            <div class="mb-2">Code : {{ item.id }}</div>
            <div class="mb-2">Password : {{ item.password }}</div>
            <div class="mb-2">Start time : {{ item.startTime }}</div>
            <div>End time : {{ item.endTime }}</div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              variant="tonal"
              style="text-transform: none"
              @click="navigateToQuestions(item.id)"
            >
              {{ $t("labels.viewQuestion") }}
            </v-btn>

            <v-btn
              color="error"
              variant="tonal"
              style="text-transform: none"
              @click="deleteQuizRequest(item.id)"
            >
              {{ $t("labels.deleteQuiz") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
  <v-dialog v-model="editQuiz">
    <v-form @submit.prevent="onEditQuiz()">
      <v-card
        max-width="400"
        width="100%"
        class="pa-4 mt-4 mx-auto elevation-3"
      >
        <v-card-title class="text-center text-primary font-popinns">
          Quiz settings
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="quizName"
            color="primary"
            density="compact"
            variant="outlined"
            label="Quiz Name"
            type="text"
            :rules="rules"
          />
          <v-text-field
            v-model="description"
            color="primary"
            density="compact"
            variant="outlined"
            label="Description"
            type="text"
            :rules="rules"
          />

          <v-text-field
            v-model="password"
            color="primary"
            density="compact"
            :append-inner-icon="
              showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            variant="outlined"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-text-field
            v-model="startTime"
            color="primary"
            density="compact"
            variant="outlined"
            label="Start time"
            type="datetime-local"
            :rules="rules"
          />
          <v-text-field
            v-model="endTime"
            color="primary"
            density="compact"
            variant="outlined"
            label="End time"
            type="datetime-local"
            :rules="rules"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="editQuiz = false"
            variant="outlined"
            style="text-transform: none"
          >
            Cancel
          </v-btn>
          <v-btn
            size="large"
            variant="elevated"
            color="primary"
            class="mx-auto"
            style="text-transform: none"
            type="submit"
          >
            {{ $t("labels.updateQuiz") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
interface Quiz {
  id: number;
  title: string;
  noOfQuestions: string;
  password: string;
  startTime: string;
  endTime: string;
}

import QuizNotFound from "@/pages/quizPages/QuizNotFound.vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useQuizStore } from "@/store/quiz";
import type { QuizRequest } from "@/types/request/quiz";
import QuizService from "@/services/quizService";

const { t } = useI18n();
const quizStore = useQuizStore();

function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "Invalid Date"; // Handle null/undefined

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Invalid Date"; // Handle invalid dates

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(parsedDate)
    .replace(",", "");
}

const quizzes = computed(() => quizStore.quizzes);
const quizItems = computed<Quiz[]>(() => {
  return quizzes.value.map((quiz) => {
    return {
      id: quiz.id,
      title: quiz.title,
      noOfQuestions: quiz.questionCount + " Questions",
      password: quiz.password,
      startTime: quiz.startTime
        ? formatDateTime(new Date(quiz.startTime))
        : "Invalid Date",
      endTime: quiz.endTime
        ? formatDateTime(new Date(quiz.endTime))
        : "Invalid Date",
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

//Editing the quiz
const editQuiz = ref(false);
const selectedQuizIdForUpdate = ref(0);

const updateQuiz = (id: number) => {
  editQuiz.value = true;
  selectedQuizIdForUpdate.value = id;
  console.log(editQuiz.value, selectedQuizIdForUpdate.value);
  const quiz = computed(() => {
    return quizzes.value.find(
      (quiz) => quiz.id === selectedQuizIdForUpdate.value
    );
  });
  quizName.value = quiz.value?.title || "";
  description.value = quiz.value?.description || "";
  password.value = quiz.value?.password || "";
  startTime.value = quiz.value?.endTime ? String(quiz.value.startTime) : "";
  endTime.value = quiz.value?.endTime ? String(quiz.value.endTime) : "";
};

const quizName = ref("");
const description = ref("");
const password = ref("");
const startTime = ref("");
const endTime = ref("");
const showPassword = ref(false);

const rules = [(v: unknown) => !!v || t("messages.thisFieldIsRequired")];
const passwordRules = [
  (v: unknown) => !!v || t("messages.thisFieldIsRequired"), // Required field validation
  (v: string) => v.length >= 6 || t("labels.passwordRules"), // Length validation
];
const token = localStorage.getItem("token");
const onEditQuiz = async () => {
  const getId = () => {
    if (token) {
      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.id;
    }
    return 0;
  };

  function formatDateToISTString(date: Date): string {
    const istDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return istDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
  }
  const start = new Date(startTime.value);
  const end = new Date(endTime.value);

  const quizRequest: QuizRequest = {
    Title: quizName.value,
    Description: description.value,
    Password: password.value,
    AdminId: getId(),
    StartTime: formatDateToISTString(start),
    EndTime: formatDateToISTString(end),
  };

  try {
    await quizService.UpdateQuizz(quizRequest, selectedQuizIdForUpdate.value);
  } catch (error) {
    console.log(error);
  }
  editQuiz.value = false;
};
</script>

<style scoped>
.v-card-text {
  margin-right: 1rem;
}
.quiz-list-container {
  max-height: 500px;
  overflow-y: auto; /* Enables vertical scroll */
  overflow-x: hidden; /* Disables horizontal scroll */
}
</style>
