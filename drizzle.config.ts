import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { join } from "path"

const dataDir = join(__dirname, "data")

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  out: "./src/db/migrations",
  driver: "pglite",
  dbCredentials: {
    url: dataDir,
  },
})
