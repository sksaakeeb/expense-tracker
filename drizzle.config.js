import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./app/db/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_zSp8RWCi6kGy@ep-plain-grass-a8p39xx3-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
