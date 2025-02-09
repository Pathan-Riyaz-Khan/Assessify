<template>
  <v-container class="justify-center">
    <v-form>
      <v-card
        max-width="400"
        width="100%"
        class="pa-4 mt-2 mx-auto elevation-3"
      >
        <v-card-title class="text-center">
          <v-img
            class="mx-auto"
            max-width="40"
            max-height="40"
            src="@/assets/science.png"
          />
          <div
            :class="[
              'font-weight-bold',
              'text-h5',
              'ma-2',
              'd-block',
              dark ? '' : 'text-primary',
            ]"
          >
            {{ $t("labels.assesify") }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
            color="primary"
            density="compact"
            class="pt-2"
            variant="outlined"
            label="Username"
            type="text"
          />
          <v-text-field
            color="primary"
            density="compact"
            class=""
            variant="outlined"
            label="Email"
            type="email"
          />
          <v-text-field
            color="primary"
            density="compact"
            :append-inner-icon="passwordIcon"
            variant="outlined"
            label="Password"
            :type="passwordType"
            @click:append-inner="showOrHidePassword"
          />
          <v-text-field
            color="primary"
            density="compact"
            :append-inner-icon="passwordIcon"
            variant="outlined"
            label="Confirm password"
            :type="passwordType"
            @click:append-inner="showOrHidePassword"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn size="large" variant="elevated" color="primary" block>
            {{ $t("labels.signUp") }}
          </v-btn>
        </v-card-actions>
        <div class="text-subtitle-2 text-primary pb-2 mt-2 text-center">
          {{ $t("messages.haveAnAccount") }}
          <router-link
            class="text-subtitle-2 text-medium-emphasis pb-2 text-decoration-none"
            to="/challenger-login"
          >
            {{ $t("labels.signInLabel") }}
          </router-link>
        </div>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTheme } from "@/composables/useTheme";
const { dark } = useAppTheme();
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
</script>
