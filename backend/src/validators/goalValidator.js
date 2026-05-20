const VALID_CATEGORIES = ['Health', 'Productivity', 'Study', 'Fitness', 'Career', 'Personal', 'Financial'];
const VALID_PERIODS = ['weekly', 'monthly', 'annual'];
const VALID_STATUSES = ['active', 'completed', 'paused'];

function validateGoal(body, isUpdate = false) {
  const errors = [];

  if (!isUpdate || body.title !== undefined) {
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length < 1) {
      errors.push({ field: 'title', message: 'Title is required' });
    } else if (body.title.trim().length > 200) {
      errors.push({ field: 'title', message: 'Title must be 200 characters or less' });
    }
  }

  if (!isUpdate || body.category !== undefined) {
    if (!body.category || !VALID_CATEGORIES.includes(body.category)) {
      errors.push({ field: 'category', message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` });
    }
  }

  if (!isUpdate || body.period !== undefined) {
    if (!body.period || !VALID_PERIODS.includes(body.period)) {
      errors.push({ field: 'period', message: `Period must be one of: ${VALID_PERIODS.join(', ')}` });
    }
  }

  if (body.status !== undefined && !VALID_STATUSES.includes(body.status)) {
    errors.push({ field: 'status', message: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  if (body.progress !== undefined) {
    if (!Number.isInteger(body.progress) || body.progress < 0 || body.progress > 100) {
      errors.push({ field: 'progress', message: 'Progress must be an integer between 0 and 100' });
    }
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validateGoal, VALID_CATEGORIES, VALID_PERIODS, VALID_STATUSES };
