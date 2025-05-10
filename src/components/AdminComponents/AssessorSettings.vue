<template>
  <v-container>
    <v-card class="mx-auto" max-width="600">
      <v-card-title class="text-center text-primary"> Settings </v-card-title>
      <v-card-text>
        <div>
          <v-chip
            prepend-icon="mdi-account"
            variant="text"
            class="font-weight-bold"
          >
            Account
          </v-chip>

          <v-divider></v-divider>
        </div>
        <div class="mt-4">
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
          <v-btn
            color="primary"
            variant="elevated"
            class="mt-4"
            block
            style="text-transform: none"
            @click="editAdmin()"
          >
            Save Changes
          </v-btn>
        </div>
        <div class="mt-5">
          <v-chip
            prepend-icon="mdi-lock"
            variant="text"
            class="font-weight-bold"
          >
            Password
          </v-chip>

          <v-divider></v-divider>
        </div>
        <div class="mt-4">
          <v-text-field
            v-model="Password"
            variant="outlined"
            label="New Password"
            density="compact"
            :append-inner-icon="
              showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :rules="rules"
          />
          <v-text-field
            v-model="confirmPassword"
            variant="outlined"
            label="confirm Password"
            density="compact"
            :append-inner-icon="
              showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            :rules="rules"
          />
          <v-btn
            color="primary"
            variant="elevated"
            class="mt-4"
            block
            style="text-transform: none"
          >
            Change Password
          </v-btn>
        </div>
        <div class="mt-5">
          <v-chip
            prepend-icon="mdi-delete"
            variant="text"
            class="font-weight-bold"
          >
            Delete Account
          </v-chip>

          <v-divider></v-divider>
        </div>
        <div class="mt-4">
          <v-btn
            color="error"
            variant="outlined"
            class="mt-4"
            block
            style="text-transform: none"
          >
            Permanently Delete Account
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
import { useAdminStore } from "@/store/admin";
import AdminService from "@/services/adminService";

const { t } = useI18n();
const rules = [(v: unknown) => !!v || t("messages.thisFieldIsRequired")];
const emailRules = [
  (v: unknown) => !!v || t("messages.thisFieldIsRequired"),
  (v: unknown) =>
    (typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) ||
    t("messages.invalidEmail"),
];

const adminStore = useAdminStore();
const admin = computed(() => {
  return adminStore.admin;
});
const Name = ref(admin.value.name);
const email = ref(admin.value.email);
const Password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);

const adminService = new AdminService();

const editAdmin = async () => {
  if (email.value === admin.value.email && Name.value === admin.value.name) {
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
  adminService.UpdateAdmin(Name.value, email.value).then(() => {
    admin.value.name = Name.value;
    admin.value.email = email.value;
  });
};
</script>
