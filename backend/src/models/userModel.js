const { getDatabase } = require('../database/connection');

function createUser(data) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash)
    VALUES (@name, @email, @password_hash)
  `);

  const info = stmt.run({
    name: data.name,
    email: data.email.toLowerCase(),
    password_hash: data.password_hash
  });

  return findById(info.lastInsertRowid);
}

function findByEmail(email) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email.toLowerCase());
}

function findById(id) {
  const db = getDatabase();
  const stmt = db.prepare('SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?');
  return stmt.get(id);
}

module.exports = {
  createUser,
  findByEmail,
  findById
};
