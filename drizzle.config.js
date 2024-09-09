import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  dbCredentials: {
    url: "postgresql://postgres:1q2w3e4r@localhost:5432/isuite",
  },
    out: "./drizzle",
  verbose: true,
  strict: true,
});