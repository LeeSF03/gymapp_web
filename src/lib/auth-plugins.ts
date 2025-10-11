import { db } from "@/db/db"
import { accounts } from "@/db/schema"
import { BetterAuthClientPlugin } from "better-auth"
import { APIError, createAuthEndpoint } from "better-auth/api"
import { BetterAuthPlugin } from "better-auth/plugins"
import { and, eq } from "drizzle-orm"
import * as z from "zod"

export const credentialVerifier = () => {
  return {
    id: "sign-in-credential-verifier",
    endpoints: {
      verifyCredential: createAuthEndpoint(
        "/sign-in/credential-verifier",
        {
          method: "POST",
          body: z.object({
            email: z.email("You need to provide a valid email address"),
            password: z
              .string()
              .min(8, "Password must be at least 8 characters"),
          }),
        },
        async (ctx) => {
          const { email, password } = ctx.body

          const userContext =
            await ctx.context.internalAdapter.findUserByEmail(email)
          if (!userContext) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid email or password",
            })
          }

          const queriedAccounts = await db
            .select({ password: accounts.password })
            .from(accounts)
            .where(
              and(
                eq(accounts.providerId, "credential"),
                eq(accounts.userId, userContext.user.id)
              )
            )
            .limit(1)

          if (queriedAccounts.length < 1) {
            throw new APIError("BAD_REQUEST", {
              message: "No password credential found",
            })
          }

          const { password: hashedPassword } = queriedAccounts[0]

          console.log({
            hash: hashedPassword,
            password,
            queriedAccounts,
          })

          if (!hashedPassword || !password) {
            throw new APIError("BAD_REQUEST", {
              message: "No password credential found",
            })
          }

          const compare = await ctx.context.password.verify({
            hash: hashedPassword,
            password,
          })

          if (!compare) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid email or password",
            })
          }

          // const {} = await ctx.context.

          return ctx.json({
            success: true,
          })
        }
      ),
    },
  } satisfies BetterAuthPlugin
}

export const credentialVerifierClient = () => {
  return {
    id: "sign-in-credential-verifier-client",
    $InferServerPlugin: {} as ReturnType<typeof credentialVerifier>,
  } satisfies BetterAuthClientPlugin
}
