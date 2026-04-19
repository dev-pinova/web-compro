const { createClient } = require('@libsql/client');
require('dotenv').config();

async function migrate() {
  const client = createClient({
    url: process.env.DATABASE_URL || 'file:dev.db',
  });

  console.log("Checking site_settings table columns...");

  const columns = [
    { name: 'site_description', type: 'TEXT' },
    { name: 'keywords', type: 'TEXT' },
    { name: 'og_image', type: 'TEXT' },
    { name: 'instagram', type: 'TEXT' },
    { name: 'facebook', type: 'TEXT' },
    { name: 'tiktok', type: 'TEXT' },
    { name: 'youtube', type: 'TEXT' },
    { name: 'linkedin', type: 'TEXT' },
    { name: 'updated_at', type: 'INTEGER' }
  ];

  for (const col of columns) {
    try {
      await client.execute(`ALTER TABLE site_settings ADD COLUMN ${col.name} ${col.type}`);
      console.log(`Added column: ${col.name}`);
    } catch (e) {
      if (e.message.includes('duplicate column name')) {
        console.log(`Column ${col.name} already exists.`);
      } else {
        console.error(`Error adding ${col.name}:`, e.message);
      }
    }
  }

  console.log("Migration finished.");
}

migrate();
