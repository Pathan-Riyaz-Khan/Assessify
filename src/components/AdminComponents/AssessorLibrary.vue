<template>
  <v-container classs="mt-2">
    <v-row class="align-left justify-space-between">
      <v-col cols="3">
        <div
          :class="[
            'text-h6',
            dark ? 'text-white' : 'text-primary',
            'font-weight-bold',
          ]"
        >
          {{ $t("labels.myLibrary") }}
        </div>
        <v-list>
          <v-list-item
            v-for="item in listItems"
            :key="item.id"
            :prepend-icon="item.iconName"
            :title="item.title"
            :class="[
              dark ? '' : 'text-primary',
              'font-poppins',
              'custom-list-item',
              'mb-1',
            ]"
            :to="item.route"
          />
        </v-list>
      </v-col>
      <v-col>
        <div class="d-flex">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
            variant="solo"
            dense
          />
          <v-select
            v-model="selectedOption"
            :items="items"
            variant="solo"
            class="custom-select ml-2"
          />
        </div>
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
const { dark } = useAppTheme();
const { t } = useI18n();

interface List {
  id: number;
  title: string;
  iconName: string;
  route: string;
}

const selectedOption = ref("Most recent");
const items = ["Most recent", "Least recent", "Alphabetical"];

const listItems: List[] = [
  {
    id: 1,
    title: t("labels.createdByMe"),
    iconName: "mdi-account",
    route: "/admin/library/createdByMe",
  },
  {
    id: 2,
    title: t("labels.previouslyUsed"),
    iconName: "mdi-reload",
    route: "/admin/library/previouslyUsed",
  },
  {
    id: 3,
    title: t("labels.likedByMe"),
    iconName: "mdi-heart-outline",
    route: "/admin/library/likedByMe",
  },
  {
    id: 4,
    title: t("labels.sharedWithme"),
    iconName: "mdi-account-group-outline",
    route: "/admin/library/sharedWithMe",
  },
];
</script>

<style socped>
.custom-select {
  max-width: 180px;
}
</style>
