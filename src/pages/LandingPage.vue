<template>
  <v-container>
    <nav-bar />
    <h2>{{ $t("messages.helloAssessify") }}</h2>
  </v-container>
</template>

<script lang="ts">
import NavBar from "./NavBar.vue";
export default {
  components: {
    NavBar,
  },
  setup() {},
};
</script>
