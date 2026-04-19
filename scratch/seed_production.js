const { createClient } = require('@libsql/client');
require('dotenv').config();

async function seed() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:dev.db',
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  console.log("Seeding initial settings to Production Database...");

  try {
    // 1. Initial Site Settings
    await client.execute({
      sql: `INSERT OR IGNORE INTO site_settings (id, site_name, email, phone, address, whatsapp, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        "global", 
        "Anugrah Jaya Desain", 
        "tonygroup8111@gmail.com", 
        "+62 851-0093-0009", 
        "Jl. Adi Sucipto No.154, Kelurahan Jajar, Kecamatan Laweyan, Surakarta 57144",
        "6285100930009",
        Date.now()
      ]
    });
    console.log("✅ Initial settings seeded successfully.");

    console.log("\n--- NEXT STEP ---");
    console.log("Please run: npx drizzle-kit push");
    console.log("to ensure all table structures are synchronized.");

  } catch (e) {
    console.error("❌ Seeding failed:", e.message);
  }
}

seed();
