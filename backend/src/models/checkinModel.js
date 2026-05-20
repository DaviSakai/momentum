const { getDatabase } = require('../database/connection');

function create(data) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO check_ins (user_id, date, sleep_hours, mood, energy, focus, hydration, study_hours, training_done, productivity_score, notes)
    VALUES (@user_id, @date, @sleep_hours, @mood, @energy, @focus, @hydration, @study_hours, @training_done, @productivity_score, @notes)
  `);

  const info = stmt.run({
    user_id: data.user_id,
    date: data.date,
    sleep_hours: data.sleep_hours ?? null,
    mood: data.mood ?? null,
    energy: data.energy ?? null,
    focus: data.focus ?? null,
    hydration: data.hydration ?? null,
    study_hours: data.study_hours ?? null,
    training_done: data.training_done ? 1 : 0,
    productivity_score: data.productivity_score ?? null,
    notes: data.notes ?? null,
  });

  return findById(info.lastInsertRowid);
}

function update(id, data) {
  const db = getDatabase();
  const stmt = db.prepare(`
    UPDATE check_ins
    SET sleep_hours = @sleep_hours, mood = @mood, energy = @energy, focus = @focus,
        hydration = @hydration, study_hours = @study_hours, training_done = @training_done,
        productivity_score = @productivity_score, notes = @notes,
        updated_at = datetime('now')
    WHERE id = @id
  `);

  stmt.run({
    id,
    sleep_hours: data.sleep_hours ?? null,
    mood: data.mood ?? null,
    energy: data.energy ?? null,
    focus: data.focus ?? null,
    hydration: data.hydration ?? null,
    study_hours: data.study_hours ?? null,
    training_done: data.training_done ? 1 : 0,
    productivity_score: data.productivity_score ?? null,
    notes: data.notes ?? null,
  });

  return findById(id);
}

function findById(id) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM check_ins WHERE id = ?').get(id);
}

function findByUserAndDate(userId, date) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM check_ins WHERE user_id = ? AND date = ?').get(userId, date);
}

function findAllByUser(userId, { page = 1, limit = 20 } = {}) {
  const db = getDatabase();
  const offset = (page - 1) * limit;

  const items = db.prepare(
    'SELECT * FROM check_ins WHERE user_id = ? ORDER BY date DESC LIMIT ? OFFSET ?'
  ).all(userId, limit, offset);

  const total = db.prepare('SELECT COUNT(*) as count FROM check_ins WHERE user_id = ?').get(userId).count;

  return { items, total, page, limit };
}

module.exports = { create, update, findById, findByUserAndDate, findAllByUser };
