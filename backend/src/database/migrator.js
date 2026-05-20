const fs = require('fs');
const path = require('path');
const { getDatabase } = require('./connection');

const MIGRATIONS_DIR = path.join(__dirname, '..', '..', '..', 'database', 'migrations');

/**
 * Run all pending SQL migrations in order.
 * Tracks applied migrations in a _migrations table.
 */
function runMigrations() {
  const db = getDatabase();

  // Create migrations tracking table
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Get already applied migrations
  const applied = db.prepare('SELECT name FROM _migrations').all().map(row => row.name);

  // Read migration files
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.log('[Migrator] No migrations directory found.');
    return;
  }

  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('[Migrator] No migration files found.');
    return;
  }

  let count = 0;

  for (const file of files) {
    if (applied.includes(file)) continue;

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf-8');

    const runMigration = db.transaction(() => {
      db.exec(sql);
      db.prepare('INSERT INTO _migrations (name) VALUES (?)').run(file);
    });

    runMigration();
    count++;
    console.log(`[Migrator] Applied: ${file}`);
  }

  if (count === 0) {
    console.log('[Migrator] All migrations up to date.');
  } else {
    console.log(`[Migrator] Applied ${count} migration(s).`);
  }
}

module.exports = { runMigrations };
