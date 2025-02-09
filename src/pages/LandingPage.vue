<template>
  <v-container>
    <v-row class="align-center justify-space-between mt-9">
      <v-col cols="8">
        <div
          :class="[
            'text-h3',
            'title-font',
            'font-weight-bold',
            dark ? 'text-white' : 'text-primary',
            'pb-6',
            '',
          ]"
        >
          {{ $t("messages.assesWithAssesify") }}
        </div>
        <div class="text-subtitle-1 text-medium-emphasis pb-2">
          {{ $t("messages.assesifySubTitle1") }}
        </div>
        <div class="text-subtitle-2 text-medium-emphasis pb-2">
          {{ $t("messages.assesifySubTitle2") }}
        </div>
        <div class="text-primary text-subtitle-1 pb-4">
          {{ $t("messages.assesifySubTitle3") }}
        </div>
        <v-btn
          size="large"
          color="primary"
          variant="elevated"
          :class="[
            'mr-2',
            'my-2',
            'py-2',
            'pr-2',
            'text-subtitle-2',
            'text-align-end',
            'rounded-ts-lg',
            'rounded-be-lg',
          ]"
        >
          {{ $t("labels.registerAsAssesor") }}
        </v-btn>
        <v-btn
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
          :to="{ name: 'ChallengerRegistration' }"
        >
          {{ $t("labels.registerAsChallenger") }}
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-img
          width="400"
          height="400"
          class="ml-auto"
          aspect-ratio="4/3"
          cover
          src="@/assets/quiz22.svg"
        />
      </v-col>
    </v-row>
  </v-container>
  <!-- About us -->
  <v-container id="about">
    <v-row class="align-center justify-space-between">
      <v-col>
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
          ]"
        >
          {{ $t("labels.whatWeOffer") }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          :color="dark ? '' : '#E3F2FD'"
          :class="['max-auto', 'mr-10', 'text-left']"
          prepend-icon="mdi-help-box-multiple-outline"
          width="100%"
        >
          <template #title>
            <span :class="[dark ? '' : 'text-primary', 'font-weigt-bold']">
              {{ $t("labels.cardHeading1") }}
            </span>
          </template>
          <v-card-text class="pt-2">
            {{ $t("messages.cardMessage1") }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          :color="dark ? '' : '#E3F2FD'"
          class="max-auto mr-10"
          prepend-icon="mdi-google-analytics"
          width="100%"
        >
          <template #title>
            <span :class="[dark ? '' : 'text-primary', 'font-weigt-bold']">
              {{ $t("labels.cardSubHeading2") }}
            </span>
          </template>
          <v-card-text class="pt-2">
            {{ $t("messages.cardMessage2") }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          :color="dark ? '' : '#E3F2FD'"
          class="max-auto mr-10"
          prepend-icon="mdi-view-dashboard-outline"
          width="100%"
        >
          <template #title>
            <span :class="[dark ? '' : 'text-primary', 'font-weigt-bold']">
              {{ $t("labels.cardHeading3") }}
            </span>
          </template>
          <v-card-text class="pt-2">
            {{ $t("messages.cardMessage3") }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!--Footer -->
  <v-container id="contact">
    <v-row class="justify-center">
      <v-col>
        <div
          :class="[
            'font-weight-bold',
            'text-h5',
            dark ? 'text-white' : 'text-primary',
            'ma-2',
          ]"
        >
          {{ $t("labels.assesify") }}
        </div>
      </v-col>
      <v-col>
        <v-list variant="plain" bg-color="transparent">
          <v-list-item class="font-weight-bold">
            {{ $t("labels.navigation") }}
          </v-list-item>
          <v-list-item>
            {{ $t("labels.test") }}
          </v-list-item>
          <v-list-item>
            {{ $t("labels.AboutUs") }}
          </v-list-item>
          <v-list-item>
            {{ $t("labels.contactUs") }}
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        <v-list variant="plain" bg-color="transparent">
          <v-list-item class="font-weight-bold">
            {{ $t("labels.resources") }}
          </v-list-item>
          <v-list-item>
            {{ $t("labels.blogs") }}
          </v-list-item>
          <v-list-item>
            {{ $t("labels.newsPaper") }}
          </v-list-item>
          <v-list-item>
            {{ $t("labels.carrer") }}
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-divider class="my-5" />
    <v-row class="">
      <v-col cols="9" class="text-left text-primary">
        &copy; {{ $t("messages.allRightsReserved") }}
      </v-col>
      <v-col cols="3" class="text-right text-primary d-flex">
        <div>
          {{ $t("labels.privacyPolicy") }}
        </div>
        <div class="ml-2">{{ $t("labels.termsOfService") }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
const { dark } = useAppTheme();
</script>

<style>
.aboutUs-bg-color {
  background-color: #eceff1;
}
</style>
