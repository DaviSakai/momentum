const { getDatabase } = require('../database/connection');

/**
 * GET /api/dashboard/summary?date=YYYY-MM-DD
 * Returns aggregated dashboard data for the authenticated user.
 * Returns null/defaults when no data exists for a section.
 */
function getSummary(req, res, next) {
  try {
    const db = getDatabase();
    const userId = req.user.id;
    const date = req.query.date || new Date().toISOString().split('T')[0];

    // Greeting data
    const user = db.prepare('SELECT name FROM users WHERE id = ?').get(userId);
    const greeting = {
      name: user ? user.name : 'Usuário',
      date,
    };

    // Check-in data (from 004-daily-checkin)
    let checkin = null;
    try {
      const tableExists = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='check_ins'"
      ).get();

      if (tableExists) {
        checkin = db.prepare(
          'SELECT mood, energy, focus, sleep_hours, hydration, productivity_score, notes, created_at FROM check_ins WHERE user_id = ? AND date = ?'
        ).get(userId, date) || null;
      }
    } catch {
      // Table doesn't exist yet — return null
    }

    // Task data (from 006-task-kanban)
    let tasks = { todo: 0, in_progress: 0, done: 0, total: 0 };
    try {
      const tableExists = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tasks'"
      ).get();

      if (tableExists) {
        const rows = db.prepare(
          'SELECT status, COUNT(*) as count FROM tasks WHERE user_id = ? GROUP BY status'
        ).all(userId);

        for (const row of rows) {
          if (row.status === 'todo') tasks.todo = row.count;
          else if (row.status === 'in_progress') tasks.in_progress = row.count;
          else if (row.status === 'done') tasks.done = row.count;
        }
        tasks.total = tasks.todo + tasks.in_progress + tasks.done;
      }
    } catch {
      // Table doesn't exist yet — return defaults
    }

    // Goal data (from 005-goals)
    let goals = { active: 0, completed: 0, total: 0 };
    try {
      const tableExists = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='goals'"
      ).get();

      if (tableExists) {
        const active = db.prepare(
          "SELECT COUNT(*) as count FROM goals WHERE user_id = ? AND status = 'active'"
        ).get(userId);
        const completed = db.prepare(
          "SELECT COUNT(*) as count FROM goals WHERE user_id = ? AND status = 'completed'"
        ).get(userId);

        goals.active = active ? active.count : 0;
        goals.completed = completed ? completed.count : 0;
        goals.total = goals.active + goals.completed;
      }
    } catch {
      // Table doesn't exist yet — return defaults
    }

    // Productivity (derived from check-in data)
    let productivity = null;
    if (checkin) {
      const { mood, energy, focus } = checkin;
      if (mood != null && energy != null && focus != null) {
        // Simple average of mood, energy, focus (all 1-5 scale) → percentage
        const score = Math.round(((mood + energy + focus) / 15) * 100);
        productivity = { score, label: getProductivityLabel(score) };
      }
    }

    res.json({ greeting, checkin, tasks, goals, productivity });
  } catch (error) {
    next(error);
  }
}

function getProductivityLabel(score) {
  if (score >= 80) return 'Excelente';
  if (score >= 60) return 'Bom';
  if (score >= 40) return 'Regular';
  return 'Baixo';
}

module.exports = { getSummary };
