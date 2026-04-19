import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, rawSqlite } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    // 1. Forced clean reset of auth tables
    if (rawSqlite) {
        console.log("Setup: Resetting auth tables...");
        rawSqlite.prepare(`DROP TABLE IF EXISTS session`).run();
        rawSqlite.prepare(`DROP TABLE IF EXISTS account`).run();
        rawSqlite.prepare(`DROP TABLE IF EXISTS verification`).run();
        rawSqlite.prepare(`DROP TABLE IF EXISTS user`).run();

        rawSqlite.prepare(`CREATE TABLE user (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, email_verified INTEGER NOT NULL DEFAULT 0, image TEXT, password TEXT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL)`).run();
        rawSqlite.prepare(`CREATE TABLE session (id TEXT PRIMARY KEY, expires_at DATETIME NOT NULL, token TEXT NOT NULL UNIQUE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, ip_address TEXT, user_agent TEXT, user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE)`).run();
        rawSqlite.prepare(`CREATE TABLE account (id TEXT PRIMARY KEY, account_id TEXT NOT NULL, provider_id TEXT NOT NULL, user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE, access_token TEXT, refresh_token TEXT, id_token TEXT, access_token_expires_at DATETIME, refresh_token_expires_at DATETIME, scope TEXT, password TEXT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL)`).run();
        rawSqlite.prepare(`CREATE TABLE verification (id TEXT PRIMARY KEY, identifier TEXT NOT NULL, token TEXT NOT NULL, expires_at DATETIME NOT NULL, created_at DATETIME, updated_at DATETIME)`).run();
    }

    const adminEmail = "admin@ajd.id";
    const adminPassword = "admin123";

    // Delete existing admin to ensure fresh start
    await db.delete(user).where(eq(user.email, adminEmail));

    // Create admin via Better-Auth API (handles hashing correctly)
    const newUser = await auth.api.signUpEmail({
        body: {
            email: adminEmail,
            password: adminPassword,
            name: "Super Admin",
        }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Admin created/reset successfully using Better-Auth.",
      credentials: {
        email: adminEmail,
        password: adminPassword
      }
    });
  } catch (error: any) {
    console.error("Setup Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create admin." }, { status: 500 });
  }
}
