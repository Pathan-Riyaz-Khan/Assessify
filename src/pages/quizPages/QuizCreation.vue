<template>
  <v-container>
    <v-app-bar elevation="1" style="height: 50px" color="background">
      <v-btn icon="mdi-arrow-left" class="mb-3" to="/admin/dashboard" />
    </v-app-bar>
    <v-alert
      v-if="showAlert"
      closable
      title="Time error"
      text="Please enter valid start and end times and make sure there is min 10 miniutes difference"
      variant="tonal"
    />
    <v-form @submit.prevent="onSubmit">
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
            size="large"
            variant="elevated"
            color="primary"
            class="mx-auto"
            block
            type="submit"
          >
            {{ $t("labels.createQuiz") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import QuizService from "@/services/quizService";
import type { QuizRequest } from "@/types/request/quiz";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const rules = [(v: unknown) => !!v || t("messages.thisFieldIsRequired")];
const passwordRules = [
  (v: unknown) => !!v || t("messages.thisFieldIsRequired"), // Required field validation
  (v: string) => v.length >= 6 || t("labels.passwordRules"), // Length validation
];

const showPassword = ref(false);
const quizName = ref("");
const description = ref("");
const password = ref("");
const startTime = ref(new Date());
const endTime = ref(new Date());

const showAlert = ref(false);

const onSubmit = async function () {
  if (!startTime.value || !endTime.value) {
    showAlert.value = true;
    return;
  }

  const start = new Date(startTime.value);
  const end = new Date(endTime.value);
  console.log("Start time:", start);
  console.log("End time:", end);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    showAlert.value = true;
    return;
  }

  if (start >= end) {
    alert("Start time must be before end time");
    return;
  }

  const minDifference = 10;
  const diffInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

  if (diffInMinutes < minDifference) {
    showAlert.value = true;
    return;
  }

  const token = localStorage.getItem("token");

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

  const quiz: QuizRequest = {
    Title: quizName.value,
    Description: description.value,
    AdminId: getId(),
    Password: password.value,
    StartTime: formatDateToISTString(start),
    EndTime: formatDateToISTString(end),
  };
  console.log("Quiz object:", quiz);
  console.log("josn quiz:", JSON.stringify(quiz));
  const quizService = new QuizService();
  try {
    await quizService.createQuiz(quiz).then((res) => {
      navigateToQuestion(res);
    });
  } catch (error) {
    console.error(error);
  }
};

const router = useRouter();

const navigateToQuestion = function (id: number) {
  router.push({ path: "/quizzes/questions", query: { quizId: id } });
  console.log("Quiz created with ID:", id);
};
</script>
