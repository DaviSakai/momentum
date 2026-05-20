const { getDatabase } = require('../database/connection');

function create(data) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO tasks (user_id, title, description, status, priority, category, due_date)
    VALUES (@user_id, @title, @description, @status, @priority, @category, @due_date)
  `);

  const info = stmt.run({
    user_id: data.user_id,
    title: data.title.trim(),
    description: data.description || null,
    status: data.status || 'todo',
    priority: data.priority || 'medium',
    category: data.category || null,
    due_date: data.due_date || null,
  });

  return findById(info.lastInsertRowid);
}

function findById(id) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

function findAllByUser(userId, filters = {}) {
  const db = getDatabase();
  let sql = 'SELECT * FROM tasks WHERE user_id = ?';
  const params = [userId];

  if (filters.status) {
    sql += ' AND status = ?';
    params.push(filters.status);
  }
  if (filters.priority) {
    sql += ' AND priority = ?';
    params.push(filters.priority);
  }
  if (filters.category) {
    sql += ' AND category = ?';
    params.push(filters.category);
  }

  sql += " ORDER BY CASE priority WHEN 'high' THEN 0 WHEN 'medium' THEN 1 WHEN 'low' THEN 2 END, created_at DESC";

  return db.prepare(sql).all(...params);
}

function update(id, data) {
  const db = getDatabase();
  const fields = [];
  const params = { id };

  if (data.title !== undefined) { fields.push('title = @title'); params.title = data.title.trim(); }
  if (data.description !== undefined) { fields.push('description = @description'); params.description = data.description; }
  if (data.status !== undefined) { fields.push('status = @status'); params.status = data.status; }
  if (data.priority !== undefined) { fields.push('priority = @priority'); params.priority = data.priority; }
  if (data.category !== undefined) { fields.push('category = @category'); params.category = data.category; }
  if (data.due_date !== undefined) { fields.push('due_date = @due_date'); params.due_date = data.due_date; }
  if (data.position !== undefined) { fields.push('position = @position'); params.position = data.position; }

  if (fields.length === 0) return findById(id);

  fields.push("updated_at = datetime('now')");
  const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = @id`;
  db.prepare(sql).run(params);

  return findById(id);
}

function remove(id) {
  const db = getDatabase();
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
}

function getSummary(userId) {
  const db = getDatabase();
  const all = db.prepare('SELECT status, due_date FROM tasks WHERE user_id = ?').all(userId);
  const today = new Date().toISOString().split('T')[0];

  const todo = all.filter(t => t.status === 'todo').length;
  const inProgress = all.filter(t => t.status === 'in_progress').length;
  const done = all.filter(t => t.status === 'done').length;
  const overdue = all.filter(t => t.due_date && t.due_date < today && t.status !== 'done').length;

  return { todo, in_progress: inProgress, done, total: all.length, overdue };
}

module.exports = { create, findById, findAllByUser, update, remove, getSummary };
