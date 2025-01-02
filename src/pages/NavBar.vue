<template>
  <v-app-bar class="" :elevation="0" color="background">
    <v-container>
      <v-row class="align-center jusitfy-space-between">
        <v-col>
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
        <v-col>
          <div class="d-flex">
            <router-link
              to="#"
              :class="[
                'text-decoration-none',
                'font-weight',
                'mx-2',
                'px-2',
                dark ? 'text-white' : 'link-color',
              ]"
              >Home</router-link
            >
            <router-link
              to="#"
              :class="[
                'text-decoration-none',
                'font-weight',
                'mx-2',
                'px-2',
                dark ? 'text-white' : 'link-color',
              ]"
              >Test</router-link
            >
            <router-link
              to="#"
              :class="[
                'text-decoration-none',
                'font-weight',
                'mx-2',
                'px-2',
                dark ? 'text-white' : 'link-color',
              ]"
              >About Us</router-link
            >
            <router-link
              to="#"
              :class="[
                'text-decoration-none',
                'font-weight',
                'mx-2',
                'px-2',
                dark ? 'text-white' : 'link-color',
              ]"
              >Contact Us</router-link
            >
          </div>
        </v-col>
        <v-col>
          <v-btn
            :icon="dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            :color="dark ? 'white' : 'dark'"
            variant="text"
            class="ml-6"
            @click="toggleTheme"
          >
          </v-btn>
          <v-btn
            size=""
            rounded="xl"
            color="#1565c0"
            variant="flat"
            :class="['ma-2', 'pa-2', 'text-subtitle-2']"
            >Create Quiz</v-btn
          >
          <v-btn
            size=""
            rounded="xl"
            :color="dark ? '#1565c0' : '#1565c0'"
            variant="outlined"
            :class="['ma-2', 'pa-2', 'text-subtitle-2']"
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
