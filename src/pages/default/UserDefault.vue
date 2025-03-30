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
import AppSideBar from "@/components/AppSideBar.vue";
import { useUserStore } from "@/store/user";
import { onMounted } from "vue";
import UserService from "@/services/userService";

const userService = new UserService();
const userStore = useUserStore();

onMounted(async function () {
  await userService.GetUser(2).then((response) => {
    userStore.setUser(response);
  });
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
</script>
