<template>
  <v-container>
    <v-row class="align-center justify-space-between mt-9">
      <v-col cols="8">
        <div
          :class="[
            'text-h3',
            'title-font',
            'font-weight-bold',
            dark ? 'text-white' : 'text-color',
            'pb-6',
          ]"
        >
          {{ $t("messages.assesWithAssesify") }}
        </div>
        <div class="text-subtitle-1 text-medium-emphasis pb-2">
          {{ $t("messages.assesifySubTitle1") }}
        </div>
        <div class="text-subtitle-2 text-medium-emphasis pb-2">
          Whether you're an educator looking to evaluate knowledge or a learner
          seeking to challenge yourself,<br />
          Assesify makes the process seamless and fun.
        </div>
        <div class="text-color text-subtitle-1 pb-4">
          Start creating or attempting quizzes today and unlock a smarter way to
          learn!
        </div>
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
          >Register as Assessor</v-btn
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
          >Register as challenger</v-btn
        >
      </v-col>
      <v-col cols="4">
        <v-img
          width="400"
          height="400"
          class="ml-auto bg-black"
          aspect-ratio="4/3"
          cover
          :src="dark ? darkImage : lightImage"
        >
        </v-img>
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-between">
      <v-col>
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-color',
            'font-weight-bold',
          ]"
        >
          What We Offer
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          :color="dark ? '' : '#E3F2FD'"
          :class="['max-auto', 'mr-10', 'text-left']"
          prepend-icon="mdi-help-box-multiple-outline"
          outlined
        >
          <template #title>
            <span :class="[dark ? '' : 'text-color', 'font-weigt-bold']">
              Instant Quiz Creation
            </span>
          </template>
          <v-card-text class="pt-2">
            Create quizzes effortlessly with our user-friendly platform.
            Customize questions, set timers, and share instantly to engage
            learners or test knowledge in just a few clicks.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          :color="dark ? '' : '#E3F2FD'"
          class="max-auto mr-10"
          prepend-icon="mdi-google-analytics"
        >
          <template v-slot:title>
            <span :class="[dark ? '' : 'text-color', 'font-weigt-bold']"
              >Live Test</span
            >
          </template>
          <v-card-text class="pt-2">
            Conduct real-time tests seamlessly. Monitor participants, track
            progress, and evaluate performance instantly with our interactive
            live testing platform.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          :color="dark ? '' : '#E3F2FD'"
          class="max-auto mr-10"
          prepend-icon="mdi-view-dashboard-outline"
        >
          <template v-slot:title>
            <span :class="[dark ? '' : 'text-color', 'font-weigt-bold']"
              >Insightful Analytics</span
            >
          </template>
          <v-card-text class="pt-2">
            Gain valuable insights with detailed analytics. Track performance,
            identify trends, and make data-driven decisions to enhance learning
            and engagement."
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row :class="[dark ? '' : 'aboutUs-bg-color']">
      <v-col>
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-color',
            'font-weight-bold',
          ]"
        >
          About Us
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
import darkImage from "@/assets/darkImage.jpg";
import lightImage from "@/assets/8357605.jpg";
const { dark } = useAppTheme();
</script>

<style>
.text-color {
  color: #0d47a1;
}
.aboutUs-bg-color {
  background-color: #eceff1;
}
</style>
