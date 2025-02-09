<template>
  <v-container class="justify-center">
    <v-form>
      <v-card
        max-width="400"
        width="100%"
        class="pa-4 mt-4 mx-auto elevation-3"
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
          <div
            :class="[
              'font-poppins',
              'text-h6',
              '',
              'd-block',
              dark ? '' : 'text-primary',
            ]"
          >
            {{ $t("labels.userLogin") }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
            color="primary"
            density="compact"
            class="py-2"
            variant="outlined"
            label="Email"
            type="email"
          />
          <v-text-field
            color="primary"
            density="compact"
            :append-inner-icon="passwordIcon"
            class="pt-2"
            variant="outlined"
            label="Password"
            :type="passwordType"
            @click:append-inner="showOrHidePassword"
          />
          <router-link
            class="text-subtitle-2 text-medium-emphasis pb-2 text-decoration-none"
            to="#"
          >
            {{ $t("labels.forgotPassword") }}
          </router-link>
        </v-card-text>
        <v-card-actions>
          <v-btn
            size="large"
            variant="elevated"
            color="primary"
            class="mx-auto"
            block
          >
            {{ $t("labels.signInLabel") }}
          </v-btn>
        </v-card-actions>
        <div class="text-subtitle-2 text-primary pb-2 mt-2 text-center">
          {{ $t("messages.doNotHaveAnAccount") }}
          <router-link
            class="text-subtitle-2 text-medium-emphasis pb-2 text-decoration-none"
            to="/challenger-registration"
          >
            {{ $t("labels.signUp") }}
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

<style>
.container-bg-color {
  background-color: rgb(216, 216, 236);
}
</style>
