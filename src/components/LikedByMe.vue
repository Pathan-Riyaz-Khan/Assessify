<template>
  <div v-if="!quizItems.length">
    <quiz-not-found :notFoundObject="notFoundMessage" />
  </div>
  <div v-else class="quiz-list-container">
    <v-virtual-scroll :items="quizItems" class="quiz-scroll">
      <template v-slot:default="{ item }">
        <v-card
          :key="item.id"
          max-width="100%"
          class="d-flex flex-row align-center pa-4"
        >
          <!-- Card Image -->
          <v-img
            src="@/assets/q.jpg"
            alt="Quiz Image"
            max-height="100%"
            max-width="100%"
            aspect-ratio="4/3"
            cover
          />

          <v-card-text class="flex-grow-1">
            <v-card-title>{{ item.title }}</v-card-title>
            <div class="d-flex">
              <v-card-subtitle>{{ item.noOfQuestions }}</v-card-subtitle>
              <v-card-subtitle>{{ item.assessorName }}</v-card-subtitle>
              <v-card-subtitle>{{ item.createdAt }}</v-card-subtitle>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn variant="elevated" color="primary" class="me-2">View</v-btn>
            <v-btn icon="mdi-delete" variant="tonal" />
          </v-card-actions>
        </v-card>
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script setup lang="ts">
interface Quiz {
  id: number;
  title: string;
  noOfQuestions: string;
  assessorName: string;
  createdAt: string;
}

import QuizNotFound from "@/pages/QuizNotFound.vue";

const quizItems: Quiz[] = [];
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const notFoundMessage = {
  notFoundMsg: t("messages.likedNotFound"),
  subTitle: t("messages.likedNotFoundSubTitle"),
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
