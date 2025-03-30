<template>
  <v-container>
    <v-app-bar elevation="1" style="height: 50px" color="background">
      <v-btn icon="mdi-arrow-left" class="mb-3" to="/user/dashboard" />
    </v-app-bar>
    <v-row class="align-center justify-start">
      <v-col cols="8">
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
            'text-left',
          ]"
        >
          {{ quizName }}
        </div>
      </v-col>
      <v-spacer />
      <v-col cols="4" class="d-flex justify-end">
        <v-btn variant="tonal" color="success" style="text-transform: none">
          Actual Option
        </v-btn>
        <v-btn
          variant="tonal"
          color="error"
          style="text-transform: none"
          class="pl-4 ml-4"
        >
          Selected Option
        </v-btn>
      </v-col>
    </v-row>

    <div class="quiz-list-container mt-2">
      <v-virtual-scroll :items="questions" class="quiz-scroll">
        <template v-slot:default="{ item, index }">
          <v-card
            :key="item.id"
            max-width="100%"
            max-height="150px"
            class="d-flex flex-row align-center mb-2"
            elevation="2"
          >
            <v-card-text class="flex-grow-1">
              <v-card-title
                :class="[
                  'font-weight-bold',
                  dark ? 'text-white' : 'text-primary',
                ]"
              >
                {{ index + 1 + ". " + item.text }}
              </v-card-title>
              <div class="d-flex flex-wrap">
                <v-card-subtitle
                  v-for="option in item.options"
                  :key="option.id"
                >
                  <v-btn
                    variant="tonal"
                    style="
                      text-transform: none;
                      margin-right: 4px;
                      margin-bottom: 6px;
                    "
                    classs="mt-2 mb-2"
                    :color="getColorOfOption(option, item.selectedOption)"
                    >{{ option.text }}</v-btn
                  >
                </v-card-subtitle>
              </div>
            </v-card-text>
          </v-card>
        </template>
      </v-virtual-scroll>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
import { useUserStore } from "@/store/user";
import { computed } from "vue";
import UserService from "@/services/userService";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const { dark } = useAppTheme();

const userStore = useUserStore();
const userService = new UserService();
const quizId = useRouter().currentRoute.value.query.quizId;

const parsedQuizId = quizId ? Number(quizId) : 0;
const quizName = computed(() => {
  return userStore.user?.quizzes?.find((quiz) => quiz.id === parsedQuizId)
    ?.title;
});

onMounted(async function () {
  await userService.GetUserAttemptedQuestions(2, parsedQuizId).then((res) => {
    userStore.setUserAttemptedQuestions(res);
  });
});

const questions = computed(() => {
  console.log(userStore.userAttemtedQuestions);
  return userStore.userAttemtedQuestions;
});
// const questions = [
//   {
//     id: 3,
//     text: "Full form of API",
//     options: [
//       { id: 1, text: "Application Programming Inheritance", isCorrect: false },
//       { id: 2, text: "Application platfrom Inheritance", isCorrect: false },
//       { id: 3, text: "Application Programming Interface", isCorrect: true },
//       { id: 4, text: "Application Platfrom Interface", isCorrect: false },
//     ],
//     selectedOption: "Application Programming Interface",
//   },
//   {
//     id: 4,
//     text: "Which HTTP method is used to retrieve data?",
//     options: [
//       { id: 5, text: "POST", isCorrect: false },
//       { id: 6, text: "GET", isCorrect: true },
//     ],
//     selectedOption: "GET",
//   },
//   {
//     id: 5,
//     text: "What is the main purpose of an API",
//     options: [
//       { id: 7, text: "To store data", isCorrect: false },
//       {
//         id: 8,
//         text: "To enable communication between software",
//         isCorrect: true,
//       },
//     ],
//     selectedOption: "To enable communication between software",
//   },
//   {
//     id: 6,
//     text: "Which status code means Not Found",
//     options: [
//       { id: 9, text: "404", isCorrect: true },
//       { id: 10, text: "500", isCorrect: false },
//       { id: 11, text: "200", isCorrect: false },
//       { id: 12, text: "201", isCorrect: false },
//     ],
//     selectedOption: "500",
//   },
//   {
//     id: 7,
//     text: "Which format is commonly used for API data exchange",
//     options: [
//       { id: 11, text: "HTML", isCorrect: false },
//       { id: 12, text: "SQL", isCorrect: true },
//     ],
//     selectedOption: "SQL",
//   },
// ];

const getColorOfOption = function (
  option: { text: string; isCorrect: boolean },
  selectedOption: string
) {
  if (option.text === selectedOption && option.isCorrect) {
    return "success";
  } else if (option.text === selectedOption && !option.isCorrect) {
    return "error";
  } else if (option.text !== selectedOption && option.isCorrect) {
    return "success";
  }
  return "warning";
};
</script>
