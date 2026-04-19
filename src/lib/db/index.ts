import { createClient } from "@libsql/client";
import * as schema from "./schema";
import path from "path";

const tursoUrl = process.env.TURSO_DATABASE_URL;

function createDb() {
  if (tursoUrl) {
    const { drizzle: drizzleLibsql } = require("drizzle-orm/libsql");
    const turso = createClient({
      url: tursoUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return { db: drizzleLibsql(turso, { schema }), sqlite: null };
  }

  // Local SQLite for development - ensuring absolute path
  const { drizzle: drizzleBetterSqlite } = require("drizzle-orm/better-sqlite3");
  const Database = require("better-sqlite3");
  const dbPath = path.join(process.cwd(), "dev.db");
  const sqlite = new Database(dbPath);
  return { db: drizzleBetterSqlite(sqlite, { schema }), sqlite };
}

const { db, sqlite: rawSqlite } = createDb();
export { db, rawSqlite };