import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./db/schema";

const sql = neon(
  "postgresql://neondb_owner:npg_zSp8RWCi6kGy@ep-plain-grass-a8p39xx3-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
);
const db = drizzle({ client: sql, schema });

export default db;
