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
            :to="create == 'Create' ? '/admin/create' : ''"
          >
            {{ create }}
          </v-btn>
          <v-list density="compact">
            <v-list-item
              v-for="listItem in listItems"
              :key="listItem.id"
              :prepend-icon="listItem.iconName"
              :title="listItem.title"
              :class="[
                dark ? '' : 'text-primary',
                'font-poppins',
                'custom-list-item',
                'mb-1',
              ]"
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
              :prepend-icon="menuListItems[0].iconName"
              :title="menuListItems[0].title"
              class="text-primary font-poppins my-1 custom-list-item"
              style="--v-list-item-prepend-margin-right: 8px"
              :to="create == 'Create' ? '/admin/profile' : '/user/profile'"
            />
            <v-list-item
              :prepend-icon="menuListItems[1].iconName"
              :title="menuListItems[1].title"
              class="text-primary font-poppins my-1 custom-list-item"
              style="--v-list-item-prepend-margin-right: 8px"
              :to="create == 'Create' ? '/admin/settings' : '/user/settings'"
            />
            <v-list-item
              :prepend-icon="menuListItems[2].iconName"
              :title="menuListItems[2].title"
              class="text-primary font-poppins my-1 custom-list-item"
              style="--v-list-item-prepend-margin-right: 8px"
              @click="logout()"
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
import type { PropType } from "vue";
import { useI18n } from "vue-i18n";
import AdminService from "@/services/adminService";
import UserService from "@/services/userService";

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  listItems: Array as PropType<List[]>,
  // eslint-disable-next-line vue/require-default-prop
  create: String,
});

const create = props.create;
const { t } = useI18n();

const menuListItems = [
  {
    id: 1,
    title: t("lables.viewProfile"),
    iconName: "mdi-account-circle-outline",
  },
  {
    id: 2,
    title: t("lables.settings"),
    iconName: "mdi-cog-outline",
  },
  {
    id: 3,
    title: t("labels.logout"),
    iconName: "mdi-logout",
  },
];

const adminService = new AdminService();
const userService = new UserService();

const logout = () => {
  if (create === "Create") {
    adminService.ClearAuth();
  } else {
    userService.ClearAuth();
  }
};
</script>

<style>
.custom-button {
  width: 200px;
  height: 50px;
}
</style>
