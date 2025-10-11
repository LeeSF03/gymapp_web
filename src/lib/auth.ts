import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/db/db"
import { expo } from "@better-auth/expo"
import { admin, emailOTP } from "better-auth/plugins"
import { sendEmailWithOTP } from "./email"
import * as schema from "../db/schema"
import { credentialVerifier } from "./auth-plugins"

export const auth = betterAuth({
  trustedOrigins: ["gymapp://"],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    //   autosignin: true,
    //   requireemailverification: true,
    // },
    // emailverification: {
    //   sendonsignin: true,
    //    sendonsignup: true,
    //   autosigninafterverification: true,
  },
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
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
    credentialVerifier(),
    admin(),
    expo(),
    // NOTE:
    // nextCookies should be last
    // When you call a function that needs to set cookies,
    // like signInEmail or signUpEmail in a server action,
    // cookies won’t be set. This is because server actions
    // need to use the cookies helper from Next.js to set cookies.
    nextCookies(),
  ],
})
