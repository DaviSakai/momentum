const taskModel = require('../models/taskModel');
const { validateTask, validateStatus } = require('../validators/taskValidator');

function list(req, res, next) {
  try {
    const filters = { status: req.query.status, priority: req.query.priority, category: req.query.category };
    const tasks = taskModel.findAllByUser(req.user.id, filters);
    res.json({ tasks });
  } catch (error) { next(error); }
}

function summary(req, res, next) {
  try {
    const data = taskModel.getSummary(req.user.id);
    res.json(data);
  } catch (error) { next(error); }
}

function getById(req, res, next) {
  try {
    const task = taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Task not found' } });
    if (task.user_id !== req.user.id) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized' } });
    res.json({ task });
  } catch (error) { next(error); }
}

function create(req, res, next) {
  try {
    const { valid, errors } = validateTask(req.body);
    if (!valid) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid task data', details: errors } });

    const task = taskModel.create({ ...req.body, user_id: req.user.id });
    res.status(201).json({ task });
  } catch (error) { next(error); }
}

function update(req, res, next) {
  try {
    const task = taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Task not found' } });
    if (task.user_id !== req.user.id) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized' } });

    const { valid, errors } = validateTask(req.body, true);
    if (!valid) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid task data', details: errors } });

    const updated = taskModel.update(task.id, req.body);
    res.json({ task: updated });
  } catch (error) { next(error); }
}

function changeStatus(req, res, next) {
  try {
    const task = taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Task not found' } });
    if (task.user_id !== req.user.id) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized' } });

    const { valid, errors } = validateStatus(req.body);
    if (!valid) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid status', details: errors } });

    const updated = taskModel.update(task.id, { status: req.body.status });
    res.json({ task: updated });
  } catch (error) { next(error); }
}

function remove(req, res, next) {
  try {
    const task = taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Task not found' } });
    if (task.user_id !== req.user.id) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized' } });

    taskModel.remove(task.id);
    res.json({ message: 'Task deleted' });
  } catch (error) { next(error); }
}

module.exports = { list, summary, getById, create, update, changeStatus, remove };
