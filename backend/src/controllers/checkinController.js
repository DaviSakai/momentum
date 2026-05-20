const checkinModel = require('../models/checkinModel');
const { upsertCheckin, getTodayDate } = require('../services/checkinService');
const { validateCheckin } = require('../validators/checkinValidator');

/**
 * GET /api/checkins/today
 */
function getToday(req, res, next) {
  try {
    const date = getTodayDate();
    const checkin = checkinModel.findByUserAndDate(req.user.id, date);
    res.json({ checkin: checkin || null });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/checkins
 */
function getAll(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = checkinModel.findAllByUser(req.user.id, { page, limit });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/checkins (upsert — create or update today's check-in)
 */
function createOrUpdate(req, res, next) {
  try {
    const { valid, errors } = validateCheckin(req.body);
    if (!valid) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Invalid check-in data', details: errors },
      });
    }

    const checkin = upsertCheckin(req.user.id, req.body);
    res.status(201).json({ checkin });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/checkins/:id
 */
function update(req, res, next) {
  try {
    const checkin = checkinModel.findById(req.params.id);
    if (!checkin) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Check-in not found' } });
    }
    if (checkin.user_id !== req.user.id) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized' } });
    }

    const { valid, errors } = validateCheckin(req.body);
    if (!valid) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Invalid check-in data', details: errors },
      });
    }

    const updated = checkinModel.update(checkin.id, req.body);
    res.json({ checkin: updated });
  } catch (error) {
    next(error);
  }
}

module.exports = { getToday, getAll, createOrUpdate, update };
