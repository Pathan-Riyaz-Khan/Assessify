<template>
  <v-container class="justify-center">
    <div
      v-if="passwordLength"
      class="text-subtitle-1 text-medium-emphasis font-poppins text-danger"
    >
      <v-alert
        closable
        title="Password Error"
        :text="passwordRule"
        type="error"
      ></v-alert>
    </div>
    <v-form @submit.prevent="addAdmin()">
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
          <div
            :class="[
              'font-poppins',
              'text-h6',
              'd-block',
              dark ? '' : 'text-primary',
            ]"
          >
            {{ $t("labels.adminRegistartion") }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            color="primary"
            density="compact"
            class="pt-2"
            variant="outlined"
            label="Username"
            type="text"
            :rules="rules"
          />
          <v-text-field
            v-model="email"
            color="primary"
            density="compact"
            class=""
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
            variant="outlined"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :rules="rules"
          />
          <v-text-field
            v-model="confirmPassword"
            color="primary"
            density="compact"
            :append-inner-icon="
              showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            variant="outlined"
            label="Confirm password"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :rules="rules"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            size="large"
            variant="elevated"
            color="primary"
            block
            type="submit"
          >
            {{ $t("labels.signUp") }}
          </v-btn>
        </v-card-actions>
        <div class="text-subtitle-2 text-primary pb-2 mt-2 text-center">
          {{ $t("messages.haveAnAccount") }}
          <router-link
            class="text-subtitle-2 text-medium-emphasis pb-2 text-decoration-none"
            to="/admin-login"
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
import type { AdminRequest } from "@/types/request/admin";

const { dark } = useAppTheme();
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import AdminService from "@/services/adminService";

const showPassword = ref(false);

const { t } = useI18n();
const rules = [(v: unknown) => !!v || t("messages.thisFieldIsRequired")];
const passwordRule = t("messages.passwordLength");

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const passwordLength = ref(false);
const router = useRouter();

const addAdmin = async () => {
  const admin: AdminRequest = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  if (password.value !== confirmPassword.value) {
    passwordLength.value = true;
    return;
  }
  //passwordNotEqual.value = false;

  if (password.value.length < 8 || password.value.length > 10) {
    passwordLength.value = true;
    return;
  }

  //passwordLength.value = false;

  if (name.value === "" || email.value === "" || password.value === "") {
    return;
  }

  const adminService = new AdminService();
  try {
    await adminService.signUp(admin);
    router.push({ path: "/admin-login" });
  } catch (error) {
    console.log(error);
  }
};
</script>
