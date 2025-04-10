import type { AdminRequest } from "@/types/request/admin";
import type { tokenResponse } from "@/types/request/token";
import type { AdminResponse } from "@/types/response/admin";
import type { AuthResponse } from "@/types/response/auth";

class AdminService {
  baseUrl = import.meta.env.VITE_API_BASE_URL;
  token = localStorage.getItem("token") || "";

  getId(): number {
    if (this.token) {
      const payloadBase64 = this.token.split(".")[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.id;
    }
    return 0;
  }

  async signUp(admin: AdminRequest): Promise<void> {
    try {
      await fetch(this.baseUrl + "admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(admin),
      });
    } catch (error) {
      throw new Error("Error adding admin: " + error);
    }
  }

  async login(admin: AuthResponse): Promise<tokenResponse> {
    try {
      const response = await fetch(this.baseUrl + "admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(admin),
      });
      const data = await response.json();

      return data as tokenResponse;
    } catch (error) {
      throw new Error("Error logging in: " + error);
    }
  }

  ClearAuth() {
    const token = localStorage.getItem("token");
    if (token) localStorage.removeItem("token");
    if (window.location.href != window.location.origin + "/") {
      window.location.href = window.location.origin + "/";
    }
  }

  async GetAdmin(): Promise<AdminResponse> {
    try {
      const Id = this.getId();
      const response = await fetch(this.baseUrl + "admin/" + Id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token || "",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error getting admin: " + error);
    }
  }
  async UpdateAdmin(name: string, email: string): Promise<void> {
    try {
      const Id = this.getId();
      await fetch(this.baseUrl + "admin/" + Id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token || "",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });
    } catch (error) {
      throw new Error("Error updating admin: " + error);
    }
  }
}

export default AdminService;
