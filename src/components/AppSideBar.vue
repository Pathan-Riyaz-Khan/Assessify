<template>
  <v-row class="align-center justify-space-between">
    <v-col>
      <v-card>
        <v-navigation-drawer
          class="navigation-color"
          width="240"
          permanent
          color="background"
        >
          <div
            :class="[
              'text-h5',
              dark ? 'text-white' : 'text-primary',
              'mt-3 mr-3',
              'font-poppins',
              'font-weight-bold',
              'text-center',
            ]"
          >
            {{ $t("labels.assesify") }}
          </div>
          <v-btn
            size="large"
            prepend-icon="mdi-plus"
            variant="elevated"
            class="pl-8 ma-2 custom-button"
            color="primary"
          >
            Create
          </v-btn>
          <v-list density="compact">
            <v-list-item
              v-for="listItem in listItems"
              :key="listItem.id"
              :prepend-icon="listItem.iconName"
              :title="listItem.title"
              class="text-primary font-poppins my-2"
              :to="listItem.route"
            />
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-col>
    <v-col>
      <v-app-bar elevation="1" style="height: 50px" color="background">
        <v-spacer />
        <v-spacer />
        <v-btn
          :icon="dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          :color="dark ? 'white' : 'dark'"
          class="mb-2"
          @click="toggleTheme"
        />
        <v-btn prepend-icon="mdi-bell-outline" class="mb-2" />
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn prepend-icon="mdi-account" class="mb-2" v-bind="props" />
          </template>
          <v-list>
            <v-list-item
              v-for="item in menuListItems"
              :key="item.id"
              :prepend-icon="item.iconName"
              :title="item.title"
              class="text-primary font-poppins my-1 custom-list-item"
              style="--v-list-item-prepend-margin-right: 8px"
            />
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
interface List {
  id: number;
  title: string;
  iconName: string;
  route: string;
}
import { useAppTheme } from "@/composables/useTheme";
const { dark, toggleTheme } = useAppTheme();
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
</script>

<style>
.custom-button {
  width: 200px;
  height: 50px;
}
</style>
