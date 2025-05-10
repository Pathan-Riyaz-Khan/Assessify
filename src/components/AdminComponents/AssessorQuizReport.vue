<template>
  <v-container>
    <v-app-bar elevation="1" style="height: 50px" color="background">
      <v-btn icon="mdi-arrow-left" class="mb-3" to="/admin/reports" />
    </v-app-bar>
    <v-row class="align-center justify-start">
      <v-col>
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
            'text-left',
            'mb-4',
          ]"
        >
          {{ quizName }}
        </div>
      </v-col>
      <v-col>
        <div class="d-flex">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
            variant="solo"
            dense
          />
          <v-select
            v-model="selectedOption"
            :items="items"
            variant="solo"
            class="custom-select ml-2"
          />
        </div>
      </v-col>
    </v-row>
    <v-table hover>
      <thead>
        <tr>
          <th class="text-primary">{{ $t("labels.sequenceNumber") }}</th>

          <th class="text-primary">{{ $t("labels.userName") }}</th>
          <th class="text-primary">{{ $t("labels.email") }}</th>
          <th class="text-primary">{{ $t("labels.noOfQuestions") }}</th>
          <th class="text-primary">{{ $t("labels.score") }}</th>
          <th class="text-primary">{{ $t("labels.accuracy") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.email">
          <td>
            <div>{{ index + 1 }}</div>
          </td>
          <td>
            <div>{{ user.name }}</div>
          </td>
          <td>
            <div>
              {{ user.email }}
            </div>
          </td>
          <td>
            <div class="ps-8">
              {{ questionsCount }}
            </div>
          </td>
          <td>
            <div class="ps-3">
              {{ user.score }}
            </div>
          </td>
          <td>
            <v-chip variant="text" :color="getAccuracyColor(user.score)">
              {{ getAccuracy(user.score) + "%" }}
            </v-chip>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
// interface User {
//   name: string;
//   email: string;
//   score: number;
// }
import { useAppTheme } from "@/composables/useTheme";
import { ref } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";

import { useQuizStore } from "@/store/quiz";

const route = useRoute();
const quizId = ref(Number(route.query.quizId));
console.log("Quiz ID: ", quizId.value);
const quizStore = useQuizStore();
const quizzes = quizStore.quizzes;

const quiz = quizzes.find((quiz) => quiz.id == quizId.value);
const users = quiz?.users || [];

console.log("Users: ", users);

const { dark } = useAppTheme();
const quizName = quiz?.title || "Quiz Name";
const questionsCount = quiz?.questionCount || 0;

const selectedOption = ref("Random");
const items = ["Random", "Top Score", "Low Score"];

watch(selectedOption, function (newValue) {
  sortUsers(newValue);
});

const sortUsers = (option: string) => {
  if (option === "Top Score") {
    return users.sort((a, b) => b.score - a.score);
  } else if (option === "Low Score") {
    return users.sort((a, b) => a.score - b.score);
  }
  return users;
};

const getAccuracy = (score: number) => {
  return (score / questionsCount) * 100;
};

const getAccuracyColor = (score: number) => {
  const accuracy = getAccuracy(score);
  if (accuracy >= 80) {
    return "success";
  } else if (accuracy >= 60) {
    return "warning";
  } else {
    return "error";
  }
};
</script>

<style socped>
.custom-select {
  max-width: 180px;
}
</style>
