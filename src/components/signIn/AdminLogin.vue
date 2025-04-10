<template>
  <v-container class="justify-center">
    <div
      v-if="wrongCredintal"
      class="text-subtitle-1 text-medium-emphasis font-poppins text-danger"
    >
      <v-alert
        closable
        density="compact"
        title="Password Error"
        :text="invalidMessage"
        type="error"
      />
    </div>
    <v-form @submit.prevent="login()">
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
              'd-block',
              dark ? '' : 'text-primary',
            ]"
          >
            {{ $t("labels.adminLogin") }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            color="primary"
            density="compact"
            class="py-2"
            variant="outlined"
            label="Email"
            type="email"
            :rules="rules"
          />
          <v-text-field
            v-model="password"
            color="primary"
            density="compact"
            :append-inner-icon="
              showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            class="pt-2"
            variant="outlined"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :rules="rules"
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
            type="submit"
          >
            {{ $t("labels.signInLabel") }}
          </v-btn>
        </v-card-actions>
        <div class="text-subtitle-2 text-primary pb-2 mt-2 text-center">
          {{ $t("messages.doNotHaveAnAccount") }}
          <router-link
            class="text-subtitle-2 text-medium-emphasis pb-2 text-decoration-none"
            to="/admin-registration"
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
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useRouter } from "vue-router";
import AdminService from "@/services/adminService";
import type { AuthResponse } from "@/types/response/auth";

const { dark } = useAppTheme();

const showPassword = ref(false);
const router = useRouter();

const { t } = useI18n();
const rules = [(v: unknown) => !!v || t("messages.thisFieldIsRequired")];
const invalidMessage = t("messages.invalidMessage");

const email = ref("");
const password = ref("");
const wrongCredintal = ref(false);

const login = async function () {
  const admin: AuthResponse = {
    email: email.value,
    password: password.value,
  };
  console.log(admin);
  const adminService = new AdminService();
  await adminService.login(admin).then((response) => {
    if (response.title != "Unauthorized") {
      localStorage.setItem("token", response.token);
      router.push("/admin/dashboard");
    } else {
      wrongCredintal.value = true;
    }
  });
};
</script>

<style>
.container-bg-color {
  background-color: rgb(216, 216, 236);
}
</style>
