<template>
  <v-container>
    <v-row class="align-center justify-space-between">
      <div
        :class="[
          'text-h5',
          'title-font',
          'font-weight-bold',
          dark ? 'text-white' : 'text-primary',
          'pb-6',
          'text-center',
          'mx-auto',
        ]"
      >
        {{ $t("labels.whatAreYouPlanningToday") }}
      </div>
    </v-row>
    <v-row class="align-center justify-space-between">
      <v-col>
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
          ]"
        >
          {{ $t("labels.assessments") }}
        </div>
      </v-col>
    </v-row>
    <v-divider />
    <v-row class="align-center justify-space-between">
      <v-col class="d-flex">
        <v-card
          v-for="creationType in creationTypes"
          :key="creationType.id"
          class="mr-2 my-3"
          :prepend-icon="creationType.iconName"
          :subtitle="creationType.subTitle"
          width="100%"
          elevation="4"
        >
          <template #title>
            <span :class="[dark ? '' : 'text-primary', 'font-weigt-bold']">
              {{ creationType.title }}
            </span>
          </template>
          <v-card-actions>
            <v-btn color="primary" :to="creationType.route">
              {{ creationType.buttonName }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-between">
      <v-col>
        <div
          :class="[
            'text-h5',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
          ]"
        >
          {{ $t("labels.recentActivites") }}
        </div>
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-between">
      <v-col class="d-flex">
        <v-card
          v-for="recentActivity in recentActivites"
          :key="recentActivity.id"
          class="mr-2 my-3"
          :subtitle="recentActivity.subTitle"
          :prepend-icon="recentActivity.iconName"
          elevation="4"
          width="100%"
          variant="elevated"
        >
          <template #title>
            <span :class="[dark ? '' : 'text-primary', 'font-weigt-bold']">
              {{ recentActivity.title }}
            </span>
          </template>
          <v-card-actions>
            <v-btn color="primary">
              {{ recentActivity.buttonName }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
interface creation {
  id: number;
  title: string;
  subTitle: string;
  iconName: string;
  buttonName: string;
  route: string;
}
import { useAppTheme } from "@/composables/useTheme";
const { dark } = useAppTheme();
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const creationTypes: creation[] = [
  {
    id: 1,
    title: t("labels.createWithInputFields"),
    subTitle: "Create an assessment from scratch",
    iconName: "mdi-pencil",
    buttonName: t("labels.createNow"),
    route: "/admin/create",
  },
  {
    id: 2,
    title: t("labels.createWithExcelSheets"),
    subTitle: "Upload worksheets",
    iconName: "mdi-upload-box-outline",
    buttonName: t("labels.upload"),
    route: "/admin/create",
  },
  {
    id: 3,
    title: t("labels.customPrompt"),
    subTitle: "Create an assessment with a prompt",
    iconName: "mdi-alpha-t",
    buttonName: t("labels.createWithPrompt"),
    route: "/admin/create",
  },
];

const recentActivites: creation[] = [
  {
    id: 1,
    title: t("labels.quizName"),
    subTitle: "created by Riyaz",
    iconName: "mdi-alpha-q-circle-outline",
    buttonName: t("labels.viewQuiz"),
    route: "#",
  },
  {
    id: 2,
    title: t("labels.quizName"),
    subTitle: "created by Riyaz",
    iconName: "mdi-alpha-q-circle-outline",
    buttonName: t("labels.viewQuiz"),
    route: "#",
  },
  {
    id: 3,
    title: t("labels.quizName"),
    subTitle: "created by Riyaz",
    iconName: "mdi-alpha-q-circle-outline",
    buttonName: t("labels.viewQuiz"),
    route: "#",
  },
];
</script>

<style>
.custom-button {
  width: 220px;
  height: 50px;
}
::v-deep(.custom-list-item .v-list-item__prepend) {
  margin-right: 8px; /* Reduce the gap */
}
.my-card {
  margin: 20px;
}
</style>
