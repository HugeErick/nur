// server file for / route

import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, cookies, fetch }) => {
    const formData = await request.formData();
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    // basic server-side validation
    if (!username || !password) {
      return fail(400, { message: "Username and password are required" });
    }

    let resultData: { success?: boolean; user?: { id: number; username: string }; error?: string };

    try {
      const response = await fetch("https://nurichvsdiewelt.work/nur/nur-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      resultData = await response.json();

      if (!response.ok || !resultData.success) {
        return fail(401, { message: resultData.error ?? "Login failed" });
      }
    } catch {
      return fail(500, { message: "Could not connect to server" });
    }

    // HttpOnly cookie — JS cannot read this
    cookies.set("nur_session", JSON.stringify(resultData.user), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      maxAge: 60 * 60 * 24 * 8, // 8 days
    });

    redirect(303, "/home");
  },
};
