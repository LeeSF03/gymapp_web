import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/db/db"
import { expo } from "@better-auth/expo"
import { admin, emailOTP } from "better-auth/plugins"
import { sendEmailWithOTP } from "./email"
import * as schema from "../db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
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
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        switch (type) {
          case "sign-in": {
            await sendEmailWithOTP(email, "Your OTP for Your Sign In", otp)
          }
          case "email-verification": {
            await sendEmailWithOTP(email, "Your OTP for Your Verification", otp)
          }
          case "forget-password": {
          }
        }
      },
    }),
    admin(),
    expo(),
    nextCookies(),
  ],
})
