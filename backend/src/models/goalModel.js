const { getDatabase } = require('../database/connection');

function create(data) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO goals (user_id, title, description, category, period, status, progress, target_value, target_date)
    VALUES (@user_id, @title, @description, @category, @period, @status, @progress, @target_value, @target_date)
  `);

  const info = stmt.run({
    user_id: data.user_id,
    title: data.title.trim(),
    description: data.description || null,
    category: data.category,
    period: data.period,
    status: data.status || 'active',
    progress: data.progress || 0,
    target_value: data.target_value || null,
    target_date: data.target_date || null,
  });

  return findById(info.lastInsertRowid);
}

function findById(id) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM goals WHERE id = ?').get(id);
}

function findAllByUser(userId, filters = {}) {
  const db = getDatabase();
  let sql = 'SELECT * FROM goals WHERE user_id = ?';
  const params = [userId];

  if (filters.status) {
    sql += ' AND status = ?';
    params.push(filters.status);
  }
  if (filters.category) {
    sql += ' AND category = ?';
    params.push(filters.category);
  }
  if (filters.period) {
    sql += ' AND period = ?';
    params.push(filters.period);
  }

  sql += ' ORDER BY CASE status WHEN \'active\' THEN 0 WHEN \'paused\' THEN 1 WHEN \'completed\' THEN 2 END, created_at DESC';

  return db.prepare(sql).all(...params);
}

function update(id, data) {
  const db = getDatabase();
  const fields = [];
  const params = { id };

  if (data.title !== undefined) { fields.push('title = @title'); params.title = data.title.trim(); }
  if (data.description !== undefined) { fields.push('description = @description'); params.description = data.description; }
  if (data.category !== undefined) { fields.push('category = @category'); params.category = data.category; }
  if (data.period !== undefined) { fields.push('period = @period'); params.period = data.period; }
  if (data.status !== undefined) { fields.push('status = @status'); params.status = data.status; }
  if (data.progress !== undefined) { fields.push('progress = @progress'); params.progress = data.progress; }
  if (data.target_value !== undefined) { fields.push('target_value = @target_value'); params.target_value = data.target_value; }
  if (data.target_date !== undefined) { fields.push('target_date = @target_date'); params.target_date = data.target_date; }

  if (fields.length === 0) return findById(id);

  fields.push("updated_at = datetime('now')");
  const sql = `UPDATE goals SET ${fields.join(', ')} WHERE id = @id`;
  db.prepare(sql).run(params);

  return findById(id);
}

function remove(id) {
  const db = getDatabase();
  db.prepare('DELETE FROM goals WHERE id = ?').run(id);
}

function getSummary(userId) {
  const db = getDatabase();
  const all = db.prepare('SELECT status, progress FROM goals WHERE user_id = ?').all(userId);
  const active = all.filter(g => g.status === 'active');
  const completed = all.filter(g => g.status === 'completed');
  const avgProgress = active.length > 0
    ? Math.round(active.reduce((sum, g) => sum + g.progress, 0) / active.length)
    : 0;

  return {
    active: active.length,
    completed: completed.length,
    total: all.length,
    avg_progress: avgProgress,
  };
}

module.exports = { create, findById, findAllByUser, update, remove, getSummary };
