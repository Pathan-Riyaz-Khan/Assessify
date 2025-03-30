<template>
  <v-container>
    <v-row class="align-center justify-space-between">
      <v-col>
        <v-card class="mx-auto" color="surface-light" max-width="100%">
          <v-card-text>
            <v-text-field
              append-inner-icon="mdi-magnify"
              density="compact"
              label="Search for Quizzes"
              variant="solo"
              hide-details
              single-line
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-between">
      <v-col
        v-for="recentActivity in user.quizzes"
        :key="recentActivity.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          class="mr-2 my-3"
          :subtitle="recentActivity.questionCount + 'Q'"
          elevation="4"
          @click="handleCardClick(recentActivity.id)"
          append-icon="mdi-open-in-new"
          width="100%"
          variant="elevated"
        >
          <template #title>
            <span :class="[dark ? '' : 'text-primary', 'font-weigt-bold']">
              {{ recentActivity.title }}
            </span>
          </template>
          <v-card-actions>
            <v-btn
              :color="getcolor(recentActivity.accuracy)"
              block
              variant="tonal"
              style="text-transform: none"
            >
              {{ recentActivity.accuracy + "%" }} {{ $t("labels.accuracy") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
import { useUserStore } from "@/store/user";
import { computed } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const user = computed(function () {
  return userStore.user;
});
const { dark } = useAppTheme();

const router = useRouter();
const handleCardClick = function (id: number) {
  router.push({ path: "/user-quiz-preview", query: { quizId: id } });
};

// const recentActivites = [
//   { id: 1, title: "Mathematics", noOfQuestions: "10", accuracy: 80 },
//   { id: 2, title: "English", noOfQuestions: "10", accuracy: 70 },
//   { id: 3, title: "Science", noOfQuestions: "5", accuracy: 40 },
//   { id: 4, title: "Python", noOfQuestions: "5", accuracy: 70 },
//   { id: 5, title: "C", noOfQuestions: "20", accuracy: 80 },
//   { id: 6, title: "C++", noOfQuestions: "10", accuracy: 90 },
//   { id: 7, title: "Java", noOfQuestions: "15", accuracy: 85 },
//   { id: 8, title: "SQL", noOfQuestions: "12", accuracy: 75 },
//   { id: 9, title: "JavaScript", noOfQuestions: "8", accuracy: 65 },
//   { id: 10, title: "Data Structures", noOfQuestions: "25", accuracy: 95 },
//   { id: 11, title: "Algorithms", noOfQuestions: "20", accuracy: 85 },
//   { id: 12, title: "Operating Systems", noOfQuestions: "10", accuracy: 60 },
//   { id: 13, title: "Computer Networks", noOfQuestions: "12", accuracy: 70 },
//   { id: 14, title: "Machine Learning", noOfQuestions: "10", accuracy: 50 },
//   {
//     id: 15,
//     title: "Artificial Intelligence",
//     noOfQuestions: "10",
//     accuracy: 55,
//   },
//   { id: 16, title: "Cyber Security", noOfQuestions: "10", accuracy: 65 },
//   { id: 17, title: "Cloud Computing", noOfQuestions: "8", accuracy: 75 },
//   { id: 18, title: "Blockchain", noOfQuestions: "6", accuracy: 60 },
//   { id: 19, title: "Big Data", noOfQuestions: "10", accuracy: 70 },
//   { id: 20, title: "IoT", noOfQuestions: "10", accuracy: 80 },
// ];

const getcolor = function (accuracy: number) {
  if (accuracy >= 80) {
    return "success";
  } else if (accuracy >= 60) {
    return "warning";
  } else {
    return "error";
  }
};
</script>
