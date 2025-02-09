<template>
  <v-app-bar
    v-if="showNavbar"
    class="mr-3 mb-3 pr-3 pt-3 pb-3"
    :elevation="0"
    color="background"
  >
    <v-container>
      <v-row class="align-center jusitfy-space-between">
        <v-col class="mr-3 pr-3">
          <app-logo />
        </v-col>
        <v-col class="ml-5 pl-5">
          <div class="d-flex">
            <router-link
              v-for="item in navItems"
              :key="item.id"
              :to="item.route"
              :class="[
                'text-decoration-none',
                'font-weight',
                'px-6',
                dark ? 'text-white' : 'text-primary',
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </v-col>
        <v-col class="ml-12 pl-13">
          <v-btn
            :icon="dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            :color="dark ? 'white' : 'dark'"
            variant="text"
            class="mr-4"
            @click="toggleTheme"
          />
          <v-btn
            v-if="!isNotLandingPage"
            size="large"
            color="primary"
            variant="outlined"
            :class="[
              'ma-2',
              'pa-2',
              'text-subtitle-2',
              'text-align-end',
              'rounded-ts-lg',
              'rounded-be-lg',
            ]"
          >
            {{ $t("labels.createQuiz") }}
          </v-btn>
          <v-btn
            v-if="!isNotLandingPage"
            variant="elevated"
            color="primary"
            size="large"
            :disabled="isNotLandingPage"
            :class="[
              'ma-2',
              'pa-2',
              'text-subtitle-2',
              'text-align-end',
              'rounded-ts-lg',
              'rounded-be-lg',
            ]"
            :to="{ name: 'StudentLogin' }"
          >
            {{ $t("labels.attemptQuiz") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
interface Nav {
  id: number;
  name: string;
  route: string;
}
import { useAppTheme } from "@/composables/useTheme";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import AppLogo from "@/components/AppLogo.vue";

const { dark, toggleTheme } = useAppTheme();
const route = useRoute();
const { t } = useI18n();

const isNotLandingPage = computed(() => route.path !== "/");
const allowedRoutes = [
  "/",
  "/challenger-login",
  "/challenger-registration",
  "/admin-login",
  "/admin-registration",
];
const showNavbar = computed(() => allowedRoutes.includes(route.path));

const navItems: Nav[] = [
  {
    id: 1,
    name: t("labels.home"),
    route: "/",
  },
  {
    id: 2,
    name: t("labels.test"),
    route: "#",
  },
  {
    id: 3,
    name: t("labels.whyAssesify"),
    route: "/#about",
  },
  {
    id: 4,
    name: t("labels.contactUs"),
    route: "/#contact",
  },
];
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

.link-color {
  color: 3d4d7a;
}
.font-poppins {
  font-family: "Poppins", sans-serif;
}
</style>
