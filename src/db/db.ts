// import { drizzle } from "drizzle-orm/postgres-js"
// import postgres from "postgres"

// const client = postgres(process.env.DATABASE_URL!)
// export const db = drizzle({ client })

import { PGlite } from "@electric-sql/pglite"
import { drizzle } from "drizzle-orm/pglite"

import { join } from "path"

const dataDir = join(__dirname, "data")

const client = new PGlite(dataDir)
export const db = drizzle({ client })

// import { migrate } from "drizzle-orm/pglite/migrator"
//
// await migrate(db, {
//   migrationsFolder: "./migrations/",
// })
//
// console.log("Migration complete")
