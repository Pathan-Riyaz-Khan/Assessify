<template>
  <v-container>
    <v-app-bar elevation="1" style="height: 50px" color="background">
      <v-btn icon="mdi-arrow-left" class="mb-3" to="/admin/dashboard" />
    </v-app-bar>
    <v-form @submit.prevent="onSubmit">
      <v-card
        max-width="400"
        width="100%"
        class="pa-4 mt-4 mx-auto elevation-3"
      >
        <v-card-title class="text-center text-primary font-popinns">
          Quiz settings
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="quizName"
            color="primary"
            density="compact"
            variant="outlined"
            label="Quiz Name"
            type="text"
          />
          <v-text-field
            v-model="description"
            color="primary"
            density="compact"
            variant="outlined"
            label="Description"
            type="text"
          />

          <v-text-field
            v-model="password"
            color="primary"
            density="compact"
            :append-inner-icon="passwordIcon"
            variant="outlined"
            label="Password"
            :type="passwordType"
            @click:append-inner="showOrHidePassword"
          />
          <v-text-field
            v-model="startTime"
            color="primary"
            density="compact"
            variant="outlined"
            label="Start time"
            type="datetime-local"
          />
          <v-text-field
            v-model="endTime"
            color="primary"
            density="compact"
            variant="outlined"
            label="End time"
            type="datetime-local"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            size="large"
            variant="elevated"
            color="primary"
            class="mx-auto"
            block
            type="submit"
          >
            {{ $t("labels.save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
const passwordIcon = ref("mdi-eye-off-outline");
const passwordIconState = ref(true);
const passwordType = ref("password");

const showOrHidePassword = function () {
  if (passwordIconState.value) {
    passwordIcon.value = "mdi-eye-outline";
    passwordIconState.value = false;
    passwordType.value = "text";
  } else {
    passwordIcon.value = "mdi-eye-off-outline";
    passwordIconState.value = true;
    passwordType.value = "password";
  }
};

const quizName = ref("");
const description = ref("");
const password = ref("");
const startTime = ref(Date);
const endTime = ref(Date);

const quiz = ref({});

const onSubmit = function () {
  quiz.value = {
    id: Date.now(),
    name: quizName.value,
    description: description.value,
    password: password.value,
    startTime: startTime.value,
    endTime: endTime.value,
  };
  console.log(quiz.value);
};
</script>
