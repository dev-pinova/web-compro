const Database = require('better-sqlite3');
const db = new Database('./dev.db');

try {
  db.prepare('ALTER TABLE inquiry ADD COLUMN service_type TEXT').run();
  console.log('Successfully added service_type column to inquiry table.');
} catch (err) {
  if (err.message.includes('duplicate column name')) {
    console.log('Column service_type already exists.');
  } else {
    console.error('Error adding column:', err.message);
  }
} finally {
  db.close();
}
