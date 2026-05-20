const checkinModel = require('../models/checkinModel');

/**
 * Get today's date in YYYY-MM-DD format.
 */
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Create or update a check-in for a given date (upsert behavior).
 */
function upsertCheckin(userId, data) {
  const date = data.date || getTodayDate();
  const existing = checkinModel.findByUserAndDate(userId, date);

  if (existing) {
    return checkinModel.update(existing.id, data);
  }

  return checkinModel.create({ ...data, user_id: userId, date });
}

module.exports = { upsertCheckin, getTodayDate };
