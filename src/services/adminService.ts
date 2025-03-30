import type { AdminRequest } from "@/types/request/admin";
import type { AuthResponse } from "@/types/response/auth";

class AdminService {
  baseUrl = import.meta.env.VITE_API_BASE_URL;

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

  async login(admin: AuthResponse): Promise<{ status: number }> {
    try {
      const response = await fetch(this.baseUrl + "admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(admin),
      });

      return { status: response.status };
    } catch (error) {
      throw new Error("Error logging in: " + error);
    }
  }
}

export default AdminService;
