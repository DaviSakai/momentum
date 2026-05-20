const goalModel = require('../models/goalModel');
const { validateGoal } = require('../validators/goalValidator');

function list(req, res, next) {
  try {
    const filters = {
      status: req.query.status,
      category: req.query.category,
      period: req.query.period,
    };
    const goals = goalModel.findAllByUser(req.user.id, filters);
    res.json({ goals });
  } catch (error) { next(error); }
}

function summary(req, res, next) {
  try {
    const data = goalModel.getSummary(req.user.id);
    res.json(data);
  } catch (error) { next(error); }
}

function getById(req, res, next) {
  try {
    const goal = goalModel.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Goal not found' } });
    if (goal.user_id !== req.user.id) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized' } });
    res.json({ goal });
  } catch (error) { next(error); }
}

function create(req, res, next) {
  try {
    const { valid, errors } = validateGoal(req.body);
    if (!valid) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid goal data', details: errors } });

    const goal = goalModel.create({ ...req.body, user_id: req.user.id });
    res.status(201).json({ goal });
  } catch (error) { next(error); }
}

function update(req, res, next) {
  try {
    const goal = goalModel.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Goal not found' } });
    if (goal.user_id !== req.user.id) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized' } });

    const { valid, errors } = validateGoal(req.body, true);
    if (!valid) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid goal data', details: errors } });

    const updated = goalModel.update(goal.id, req.body);
    res.json({ goal: updated });
  } catch (error) { next(error); }
}

function updateProgress(req, res, next) {
  try {
    const goal = goalModel.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Goal not found' } });
    if (goal.user_id !== req.user.id) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized' } });

    if (!Number.isInteger(req.body.progress) || req.body.progress < 0 || req.body.progress > 100) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Progress must be 0-100' } });
    }

    const updated = goalModel.update(goal.id, { progress: req.body.progress });
    res.json({ goal: updated });
  } catch (error) { next(error); }
}

function remove(req, res, next) {
  try {
    const goal = goalModel.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Goal not found' } });
    if (goal.user_id !== req.user.id) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized' } });

    goalModel.remove(goal.id);
    res.json({ message: 'Goal deleted' });
  } catch (error) { next(error); }
}

module.exports = { list, summary, getById, create, update, updateProgress, remove };
