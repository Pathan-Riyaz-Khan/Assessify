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
        <v-btn
          :variant="answered ? 'elevated' : 'outlined'"
          color="primary"
          class="mr-2"
          style="text-transform: none"
          @click="getAnsweredQuestions()"
        >
          {{ $t("labels.answered") }}
        </v-btn>
        <v-btn
          :variant="!answered ? 'elevated' : 'outlined'"
          color="primary"
          class="mr-2"
          style="text-transform: none"
          @click="getUnAnsweredQuestions()"
        >
          {{ $t("labels.unAnswered") }}
        </v-btn>

        <v-btn variant="tonal" color="success" style="text-transform: none">
          {{ $t("labels.actualOption") }}
        </v-btn>
        <v-btn
          variant="tonal"
          color="error"
          style="text-transform: none"
          class="pl-4 ml-4"
        >
          {{ $t("labels.selectedOption") }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="presentDate < endTime">
      <v-col>
        <div
          :class="[
            'text-h6',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
            'text-center',
          ]"
        >
          {{ $t("messages.timeLeftAlert") }}
        </div>
      </v-col>
    </v-row>
    <v-row v-else-if="!answered && unAnsweredQuestions.length === 0">
      <v-col>
        <div
          :class="[
            'text-h6',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
            'text-center',
          ]"
        >
          {{ $t("messages.unAnsweredQuestion") }}
        </div>
      </v-col>
    </v-row>
    <v-row v-else-if="answered && userAttemptedquestions.length === 0">
      <v-col>
        <div
          :class="[
            'text-h6',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
            'text-center',
          ]"
        >
          {{ $t("messages.answeredQuestions") }}
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="(item, index) in answered
          ? userAttemptedquestions
          : unAnsweredQuestions"
        :key="item.id"
        cols="12"
      >
        <v-card :key="item.id" class="mb-2" elevation="2">
          <v-card-title
            :class="['font-weight-bold', dark ? 'text-white' : 'text-primary']"
          >
            {{ index + 1 + ". " + item.text }}
          </v-card-title>
          <v-card-text class="d-flex flex-wrap">
            <v-btn
              v-for="option in item.options"
              :key="option.id"
              variant="tonal"
              class="ma-1 text-none"
              :color="
                answered
                  ? getColorOfOption(option, item.selectedOption)
                  : getColorOfOptionForUnanswered(option)
              "
            >
              {{ option.text }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
import { useUserStore } from "@/store/user";
import { computed, ref } from "vue";
import UserService from "@/services/userService";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import QuestionService from "@/services/questionService";
import { useQuestionStore } from "@/store/questions";

const { dark } = useAppTheme();

const userStore = useUserStore();
const userService = new UserService();
const questionStore = useQuestionStore();
const questionService = new QuestionService();
const quizId = useRouter().currentRoute.value.query.quizId;

const parsedQuizId = quizId ? Number(quizId) : 0;
const quiz = computed(() => {
  return userStore.user?.quizzes?.find((quiz) => quiz.id === parsedQuizId);
});

const quizName = computed(() => {
  return quiz.value?.title;
});

const presentDate = new Date();
const endTime = new Date(quiz.value?.endTime || 0);

onMounted(async function () {
  await userService.GetUserAttemptedQuestions(parsedQuizId).then((res) => {
    userStore.setUserAttemptedQuestions(res);
  });
  await questionService.GetQuestions(parsedQuizId).then((res) => {
    questionStore.setQuestions(res);
  });
});

const userAttemptedquestions = computed(() => {
  return userStore.userAttemtedQuestions;
});

const quizQuestions = computed(() => {
  return questionStore.questions.map((question) => ({
    ...question,
    selectedOption: "", // Add a default selectedOption property
  }));
});

const unAnsweredQuestions = ref<
  {
    id: number;
    text: string;
    quizId: number;
    options: { id: number; text: string; isCorrect: boolean }[];
    selectedOption: string;
  }[]
>([]);

const getAnsweredQuestions = () => {
  answered.value = true;
  console.log(userAttemptedquestions.value);
};

const getUnAnsweredQuestions = () => {
  answered.value = false;
  unAnsweredQuestions.value = quizQuestions.value.filter((question) => {
    for (const userAttemptedquestion of userAttemptedquestions.value) {
      if (userAttemptedquestion.id === question.id) {
        return false;
      }
    }
    return true;
  });
};
const answered = ref(true);

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
  return "orange";
};

const getColorOfOptionForUnanswered = (option: {
  text: string;
  isCorrect: boolean;
}) => {
  if (option.isCorrect) {
    return "success";
  }
  return "orange";
};
</script>
