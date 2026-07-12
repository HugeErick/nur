// src/hooks.server.ts
import { redirect, type Handle } from "@sveltejs/kit";

// routes accessible without a session
const PUBLIC_ROUTES = ["/", "/signUp", "/forgotPassword", "/resetPassword"];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;
  const sessionCookie = event.cookies.get("nur_session");

  // make session available in event.locals for +page.server.ts / +layout.server.ts use
  if (sessionCookie) {
    try {
      event.locals.user = JSON.parse(sessionCookie);
    } catch {
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  const isPublic = isPublicRoute(pathname);

  // no session + trying to hit a protected route -> bounce to login
  if (!event.locals.user && !isPublic) {
    throw redirect(303, "/");
  }

  // sit on the login page — send them to /home instead.
  if (event.locals.user && pathname === "/") {
    throw redirect(303, "/home");
  }

  return resolve(event);
};
