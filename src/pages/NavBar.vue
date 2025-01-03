<template>
  <v-app-bar
    class="mr-3 mt-3 mb-3 pr-3 pt-3 pb-3"
    :elevation="0"
    color="background"
  >
    <v-container>
      <v-row class="align-center jusitfy-space-between">
        <v-col class="mr-3 pr-3">
          <div class="d-flex">
            <v-img
              height="30"
              class="ma-2"
              width="36"
              max-width="36"
              src="@/assets/science.png"
            />
            <v-app-bar-title
              :class="[
                'font-weight-bold',
                'text-h5',
                dark ? 'text-white' : 'logo-color',
                'ma-2',
              ]"
              >Assesify</v-app-bar-title
            >
          </div>
        </v-col>
        <v-col class="ml-5 pl-5">
          <div class="d-flex">
            <router-link
              to="#"
              :class="[
                'text-decoration-none',
                'font-weight',
                'px-6',
                dark ? 'text-white' : 'link-color',
              ]"
              >Home</router-link
            >
            <router-link
              to="#"
              :class="[
                'text-decoration-none',
                'font-weight',
                'px-6',
                dark ? 'text-white' : 'link-color',
              ]"
              >Test</router-link
            >
            <router-link
              to="#"
              :class="[
                'text-decoration-none',
                'font-weight',
                'd-flex',
                'px-6',
                dark ? 'text-white' : 'link-color',
              ]"
              >Assesify?</router-link
            >
            <router-link
              to="#"
              :class="[
                'text-decoration-none',
                'font-weight',
                'px-6',
                'd-flex',
                dark ? 'text-white' : 'link-color',
              ]"
              >ContactUs</router-link
            >
          </div>
        </v-col>
        <v-col class="ml-12 pl-13">
          <v-btn
            :icon="dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            :color="dark ? 'white' : 'dark'"
            variant="text"
            class="mr-4"
            @click="toggleTheme"
          >
          </v-btn>
          <v-btn
            size="large"
            color="#1565c0"
            variant="elevated"
            :class="[
              'ma-2',
              'pa-2',
              'text-subtitle-2',
              'text-align-end',
              'rounded-ts-lg',
              'rounded-be-lg',
            ]"
            >Create Quiz</v-btn
          >
          <v-btn
            size="large"
            :color="dark ? '#1565c0' : '#1565c0'"
            variant="outlined"
            :class="[
              'ma-2',
              'pa-2',
              'text-subtitle-2',
              'text-align-end',
              'rounded-ts-lg',
              'rounded-be-lg',
            ]"
            >Attempt Quiz</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";

const { dark, toggleTheme } = useAppTheme();
</script>

<style>
.link-color {
  color: #0d47a1;
}
.logo-color {
  color: #1976d2;
}
</style>
