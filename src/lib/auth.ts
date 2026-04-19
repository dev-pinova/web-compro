import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // set to true in production
    autoSignIn: false,
  },
  // Since we want single admin, we can add a hook to check if admin exists during signup
  // but for simplicity, we'll rely on manual db seeding for now.
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  // Optional: enable cookies
  cookies: {
    session: {
      name: "auth-session",
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // true in production
    },
  },
});