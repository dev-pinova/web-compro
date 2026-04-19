const Database = require('better-sqlite3');
const db = new Database('./dev.db');

try {
  db.prepare('ALTER TABLE portfolio ADD COLUMN gallery TEXT').run();
  console.log('Successfully added gallery column to portfolio table.');
} catch (err) {
  if (err.message.includes('duplicate column name')) {
    console.log('Column gallery already exists.');
  } else {
    console.error('Error adding column:', err.message);
  }
} finally {
  db.close();
}
