<template>
  <v-container fluid>
    <v-app-bar elevation="1" style="height: 50px" color="background">
      <v-btn icon="mdi-arrow-left" class="mb-3" to="/user/dashboard" />
    </v-app-bar>
  </v-container>
  <v-container fluid class="fill-height justify-center">
    <v-card max-width="600" width="100%" elevation="10" rounded="true">
      <v-card-title class="text-primary text-center text-wrap">
        {{ quiz.title }}
      </v-card-title>
      <v-card-subtitle class="text-center text-wrap">
        {{ quiz.description }}
      </v-card-subtitle>
      <v-card-text class="text-primary text-center font-weight-bold">
        <div class="mb-2">Start time : {{ quiz.startTime }}</div>
        <div>End time : {{ quiz.endTime }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="!IsQuizActive"
          prepend-icon="mdi-play-circle"
          color="primary"
          block
          variant="tonal"
          style="text-transform: none"
          to="/user/quiz-attempt"
        >
          {{ $t("labels.startQuiz") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbarVisible"
      location="top center"
      variant="elevated"
      timeout="5000"
      :color="IsQuizActive ? 'success' : 'error'"
    >
      {{ "The Quiz is " + QuizStauts }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
const userStore = useUserStore();
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

const quiz = computed(() => {
  return {
    title: userStore.quiz.title,
    description: userStore.quiz.description,
    startTime: userStore.quiz.startTime
      ? formatDateTime(new Date(userStore.quiz.startTime))
      : "Invalid Date",
    endTime: userStore.quiz.endTime
      ? formatDateTime(new Date(userStore.quiz.endTime))
      : "Invalid Date",
  };
});

const getPresentDate = ref(new Date());

const quizForTime = userStore.quiz;

const IsQuizActive = ref(false);
const snackbarVisible = ref(false);
const QuizStauts = ref("Not Started");

const intervalId = ref(0);
onMounted(() => {
  getPresentDate.value = new Date();
  intervalId.value = setInterval(() => {
    getPresentDate.value = new Date();
  }, 10000); // every 10 seconds
});

// Cleanup when component is destroyed
onUnmounted(() => {
  clearInterval(intervalId.value);
});

watch(getPresentDate, () => {
  snackbarVisible.value = !IsQuizActive.value;
  const presentDate = getPresentDate.value;
  const quizStartTime = new Date(quizForTime.startTime);
  const quizEndTime = new Date(quizForTime.endTime);

  if (presentDate >= quizStartTime && presentDate <= quizEndTime) {
    IsQuizActive.value = true;
    QuizStauts.value = "Live";
  } else if (presentDate > quizEndTime) {
    IsQuizActive.value = false;
    QuizStauts.value = "Ended";
  } else {
    IsQuizActive.value = false;
    QuizStauts.value = "Not Started";
  }
});
</script>
