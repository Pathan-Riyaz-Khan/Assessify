<template>
  <v-container>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" color="error" location="top right">
        {{ $t("messages.joinQuizError") }}
      </v-snackbar>
    </div>
    <v-row class="align-center justify-space-between">
      <v-col>
        <v-form @submit.prevent="JoinQuiz()">
          <v-card width="100%" max-width="600" max-height="300" elevation="4">
            <v-card-text>
              <v-text-field
                v-model="code"
                color="primary"
                class="px-5 pt-5 pb-2"
                variant="outlined"
                label="Code"
                type="number"
                :rules="rules"
              />
              <v-text-field
                v-model="password"
                color="primary"
                class="px-5"
                variant="outlined"
                label="Password"
                type="password"
                :rules="rules"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                color="primary"
                class="mx-auto"
                size="large"
                variant="outlined"
              >
                Join Quiz
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col>
        <div
          :class="[
            'text-h5',
            'title-font',
            'font-weight-bold',
            dark ? 'text-white' : 'text-primary',
            'ps-4 pb-8',
            'text-center',
            'mx-auto',
          ]"
        >
          {{ $t("messages.quizEnteringMsg") }}
        </div>
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-between">
      <v-col>
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
            'pt-4',
          ]"
        >
          {{ $t("labels.recentActivites") }}
        </div>
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-betwee">
      <v-col>
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
            'pt-4',
          ]"
          v-if="!user || user?.quizzes === null"
        >
          {{ $t("messages.noRecentActivities") }}
        </div>
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-between">
      <v-col class="d-flex" cols="12" sm="6" md="4">
        <v-card
          v-for="recentActivity in user.quizzes"
          :key="recentActivity.id"
          class="mr-2 my-3"
          :subtitle="recentActivity.questionCount + 'Q'"
          elevation="4"
          append-icon="mdi-open-in-new"
          @click="handleCardClick(recentActivity.id)"
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
import { ref } from "vue";
import { useAppTheme } from "@/composables/useTheme";
import { useUserStore } from "@/store/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import UserService from "@/services/userService";
import QuestionService from "@/services/questionService";
import { useQuestionStore } from "@/store/questions";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { dark } = useAppTheme();

const code = ref(0);
const password = ref("");
const rules = [(v: unknown) => !!v || t("messages.thisFieldIsRequired")];

const userStore = useUserStore();
const userService = new UserService();
const questionService = new QuestionService();
const questionStore = useQuestionStore();

const user = computed(function () {
  return userStore.user || null;
});

const router = useRouter();
const snackbar = ref(false);

const JoinQuiz = async function () {
  try {
    const Id = await userService.JoinQuiz(code.value, password.value);
    await questionService.GetQuestions(Id).then((res) => {
      questionStore.setQuestions(res);
    });
  } catch (error) {
    snackbar.value = true;
    console.log(error);
  }
};

const getcolor = function (accuracy: number) {
  if (accuracy >= 80) {
    return "success";
  } else if (accuracy >= 60) {
    return "warning";
  } else {
    return "error";
  }
};
const handleCardClick = function (id: number) {
  router.push({ path: "/user-quiz-preview", query: { quizId: id } });
};
</script>
