<template>
  <div class="reports-container pa-4">
    <v-table hover>
      <thead>
        <tr>
          <th class="text-primary">{{ $t("labels.quizName") }}</th>
          <th class="text-primary">{{ $t("labels.totalParticipants") }}</th>
          <th class="text-primary">{{ $t("labels.accuracy") }}</th>
          <th class="text-primary">{{ $t("labels.createdAt") }}</th>
        </tr>
      </thead>
      <tbody to="admin/quiz-report">
        <tr
          v-for="quiz in quizItems"
          :key="quiz.id"
          @click="navigateToReport(quiz.id)"
        >
          <td>
            <div>{{ quiz.title }}</div>
          </td>
          <td>
            <div class="ps-8">
              {{ quiz.userCount }}
            </div>
          </td>
          <td>
            <v-chip variant="text" :color="getColor(quiz.accuracy)">
              {{ quiz.accuracy + "%" }}
            </v-chip>
          </td>
          <td>{{ getCreatedDate(quiz.createdAt) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
interface Quiz {
  id: number;
  title: string;
  accuracy: number;
  userCount: number;
  createdAt: string;
}
import { useRouter } from "vue-router";
import { useQuizStore } from "@/store/quiz";
import { computed } from "vue";

const quizStore = useQuizStore();

const quizzes = computed(() => quizStore.quizzes);
const quizItems = computed<Quiz[]>(() => {
  return quizzes.value.map((quiz) => {
    return {
      id: quiz.id,
      title: quiz.title,
      accuracy: quiz.accuracy,
      userCount: quiz.userCount,
      createdAt: "March 23, 2025",
    };
  });
});

const router = useRouter();

const navigateToReport = (quizId: number) => {
  router.push({ path: "/admin/quiz-report", query: { quizId: quizId } });
};

const getColor = (accuracy: number) => {
  if (accuracy >= 80) return "success";
  if (accuracy >= 50) return "warning";
  return "error";
};

const getCreatedDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.reports-container {
  background: white;
  border-radius: 8px;
}
</style>
