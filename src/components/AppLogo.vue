<template v-slot:prepend>
  <div class="d-flex" @click="navigateToHome">
    <v-img
      height="30"
      class="ma-2"
      width="36"
      max-width="36"
      src="@/assets/science.png"
      to="/"
    />
    <div
      :class="[
        'text-h5',
        dark ? 'text-white' : 'text-primary',
        'ma-2',
        'font-poppins',
        'font-weight-bold',
      ]"
    >
      {{ $t("labels.assesify") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
const { dark } = useAppTheme();
import { useRouter } from "vue-router";
const router = useRouter();
const navigateToHome = () => {
  router.push({ name: "LandingPage" });
};
</script>
