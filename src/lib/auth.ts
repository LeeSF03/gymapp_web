import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/db/db"
import { expo } from "@better-auth/expo"
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["gymapp://"],

  // NOTE:
  // nextCookies should be last
  // When you call a function that needs to set cookies,
  // like signInEmail or signUpEmail in a server action,
  // cookies won’t be set. This is because server actions
  // need to use the cookies helper from Next.js to set cookies.
  plugins: [admin(), expo(), nextCookies()],
})
