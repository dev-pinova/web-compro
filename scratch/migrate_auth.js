const Database = require('better-sqlite3');
const db = new Database('./dev.db');

const tables = [
  `CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    expires_at DATETIME NOT NULL,
    token TEXT NOT NULL UNIQUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    access_token TEXT,
    refresh_token TEXT,
    id_token TEXT,
    access_token_expires_at DATETIME,
    refresh_token_expires_at DATETIME,
    scope TEXT,
    password TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
  )`
];

try {
  for (const table of tables) {
    db.prepare(table).run();
  }
  console.log('Successfully created auth tables.');
} catch (err) {
  console.error('Error migrating:', err.message);
} finally {
  db.close();
}
