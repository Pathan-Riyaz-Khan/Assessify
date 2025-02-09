<template>
  <v-container>
    <v-row class="align-center justify-center d-flex">
      <v-col class="mt-6">
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
            'text-center',
          ]"
        >
          {{ notFoundObject?.notFoundMsg }}
        </div>
        <div class="mt-2 text-subtitle-1 text-medium-emphasis pb-2 text-center">
          {{ notFoundObject?.subTitle }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn
          size="large"
          prepend-icon="mdi-plus"
          variant="elevated"
          class="custom-button"
          color="primary"
        >
          Create Quiz
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
const { dark } = useAppTheme();
interface notFoundInterface {
  notFoundMsg: string;
  subTitle: string;
}
defineProps<{
  notFoundObject: notFoundInterface;
}>();
</script>
