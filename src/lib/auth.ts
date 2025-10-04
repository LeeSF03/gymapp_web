import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"

// TODO: add drizzle adapter
export const auth = betterAuth({
  // drizzle adapter here
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
})
