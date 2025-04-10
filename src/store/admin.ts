import { defineStore } from "pinia";
import type { AdminResponse } from "@/types/response/admin";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    admin: {} as AdminResponse,
    token: "" as string,
  }),

  getters: {
    getAdmin(): AdminResponse {
      return this.admin;
    },
    getToken(): string {
      return this.token;
    },
  },

  actions: {
    setAdmin(admin: AdminResponse): void {
      this.admin = admin;
    },
    setToken(token: string): void {
      this.token = token;
    },
  },
});
