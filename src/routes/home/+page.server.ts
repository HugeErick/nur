import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  logout: async ({ cookies }) => {
    cookies.delete("nur_session", { path: "/" });
    redirect(303, "/");
  },
};
