<template>
  <v-container>
    <app-side-bar />
    <router-view />
  </v-container>
</template>

<script setup lang="ts">
import AppSideBar from "@/components/AppSideBar.vue";
</script>
