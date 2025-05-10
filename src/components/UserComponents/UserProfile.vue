<template>
  <v-container>
    <v-card class="pa-4" outlined>
      <v-row class="align-center" no-gutters>
        <!-- Avatar -->
        <v-col cols="2">
          <v-img
            src="@/assets/profile.jpg"
            alt="User"
            max-height="200px"
            max-width="200px"
            aspect-ratio="4/3"
            cover
          />
        </v-col>

        <!-- User Info -->
        <v-col class="ml-4">
          <div class="text-h6 font-weight-bold text-primary">
            {{ user.name }}
          </div>
          <div class="text-subtitle-2 purple--text">
            {{ user.email }}
          </div>
        </v-col>

        <!-- Action Buttons -->
        <v-col class="d-flex justify-end" cols="auto">
          <v-btn
            outlined
            color="primary"
            style="text-transform: none"
            @click="dialog = true"
          >
            <v-icon left>mdi-account-edit</v-icon> Edit Profile
          </v-btn>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <!-- Stats -->
      <v-row justify="space-around" class="text-center">
        <v-col cols="auto">
          <div class="text-h6 text-primary">{{ user.quizzes.length }}</div>
          <div class="caption text-primary">QUIZZES</div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-form @submit.prevent="editAdmin()">
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="Name"
            variant="outlined"
            label="Name"
            density="compact"
            clearable
            :rules="rules"
          />
          <v-text-field
            v-model="email"
            variant="outlined"
            label="Email"
            density="compact"
            clearable
            :rules="emailRules"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="outlined" @click="dialog = false"
            >cancel</v-btn
          >
          <v-btn type="submit" color="primary" variant="elevated">
            {{ $t("labels.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import UserService from "@/services/userService";

const userStore = useUserStore();
const userService = new UserService();

const { t } = useI18n();
const rules = [(v: unknown) => !!v || t("messages.thisFieldIsRequired")];
const emailRules = [
  (v: unknown) => !!v || t("messages.thisFieldIsRequired"),
  (v: unknown) =>
    (typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) ||
    t("messages.invalidEmail"),
];

const Name = ref("");
const dialog = ref(false);
const email = ref("");

const user = computed(() => {
  return userStore.user;
});

const editAdmin = async () => {
  if (email.value === user.value.email && Name.value === user.value.name) {
    alert("No changes made to the profile.");
    return;
  }
  if (Name.value === "") {
    alert("Name cannot be empty.");
    return;
  }
  if (email.value === "") {
    alert("Email cannot be empty.");
    return;
  }
  dialog.value = false;
  userService.UpdateUser(Name.value, email.value).then(() => {
    user.value.name = Name.value;
    user.value.email = email.value;
  });
};
</script>
