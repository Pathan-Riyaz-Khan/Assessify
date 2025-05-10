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
