const Database = require('better-sqlite3');
const path = require('path');

let db = null;

/**
 * Initialize SQLite database connection.
 * Creates the database file if it doesn't exist.
 */
function initializeDatabase() {
  const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', '..', '..', 'database', 'momentum.db');

  db = new Database(dbPath);

  // Enable WAL mode for better concurrent performance
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  console.log(`[Database] Connected to SQLite at ${dbPath}`);
  return db;
}

/**
 * Get the current database connection.
 */
function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

/**
 * Close the database connection.
 */
function closeDatabase() {
  if (db) {
    db.close();
    db = null;
    console.log('[Database] Connection closed.');
  }
}

module.exports = { initializeDatabase, getDatabase, closeDatabase };
