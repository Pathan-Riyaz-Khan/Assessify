<template>
  <v-app>
    <v-main>
      <v-container>
        <nav-bar />
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavBar from "./pages/NavBar.vue";
</script>
