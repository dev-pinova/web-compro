import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { drizzle as drizzleBetterSqlite } from "drizzle-orm/better-sqlite3";
import { createClient } from "@libsql/client";
import Database from "better-sqlite3";
import * as schema from "./schema";
import path from "path";

const tursoUrl = process.env.TURSO_DATABASE_URL;

function createDb() {
  if (tursoUrl) {
    const turso = createClient({
      url: tursoUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return { db: drizzleLibsql(turso, { schema }), sqlite: null };
  }

  // Local SQLite for development - ensuring absolute path
  const dbPath = path.join(process.cwd(), "dev.db");
  const sqlite = new Database(dbPath);
  return { db: drizzleBetterSqlite(sqlite, { schema }), sqlite };
}

const { db, sqlite: rawSqlite } = createDb();
export { db, rawSqlite };