<template>
  <v-container>
    <app-side-bar
      :listItems="listItems"
      :menuListItems="menuListItems"
      :create="create"
    />
    <router-view />
  </v-container>
</template>

<script setup lang="ts">
interface List {
  id: number;
  title: string;
  iconName: string;
  route: string;
}
import { useI18n } from "vue-i18n";
import QuizService from "@/services/quizService";
import { useQuizStore } from "@/store/quiz";
import { onMounted } from "vue";

const quizService = new QuizService();

const quizStore = useQuizStore();

onMounted(async () => {
  await quizService.GetQuizzes().then((response) => {
    quizStore.setQuizzes(response);
  });
});

const { t } = useI18n();

const create = "Create";

const listItems: List[] = [
  {
    id: 1,
    title: t("labels.explore"),
    iconName: "mdi-home",
    route: "/admin/dashboard",
  },
  {
    id: 2,
    title: t("labels.library"),
    iconName: "mdi-notebook-edit",
    route: "/admin/library",
  },
  {
    id: 3,
    title: t("labels.reports"),
    iconName: "mdi-chart-bubble",
    route: "/admin/reports",
  },
];
const menuListItems: List[] = [
  {
    id: 1,
    title: t("lables.viewProfile"),
    iconName: "mdi-account-circle-outline",
    route: "#",
  },
  {
    id: 2,
    title: t("lables.settings"),
    iconName: "mdi-cog-outline",
    route: "#",
  },
  {
    id: 3,
    title: t("labels.logout"),
    iconName: "mdi-logout",
    route: "#",
  },
];
import AppSideBar from "../../components/AppSideBar.vue";
</script>
