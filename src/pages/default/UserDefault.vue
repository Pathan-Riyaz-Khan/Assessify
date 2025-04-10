<template>
  <v-container fluid>
    <app-side-bar :listItems="listItems" :create="create" />
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
import AppSideBar from "@/components/AppSideBar.vue";
import { useUserStore } from "@/store/user";
import { onMounted } from "vue";
import UserService from "@/services/userService";
import { useRouter } from "vue-router";

const userService = new UserService();
const userStore = useUserStore();
const router = useRouter();

onMounted(async function () {
  const user = localStorage.getItem("token");
  if (user == null) {
    router.push({ path: "/challenger-login" });
  } else {
    await userService.GetUser().then((response) => {
      userStore.setUser(response);
    });
  }
});

const { t } = useI18n();

const create = "Explore";

const listItems: List[] = [
  {
    id: 1,
    title: t("labels.home"),
    iconName: "mdi-home",
    route: "/user/dashboard",
  },
  {
    id: 2,
    title: t("labels.activity"),
    iconName: "mdi-notebook-edit",
    route: "/user/activity",
  },
  {
    id: 3,
    title: t("labels.reports"),
    iconName: "mdi-chart-bubble",
    route: "/user/report",
  },
];
</script>
