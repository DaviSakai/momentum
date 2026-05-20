const VALID_STATUSES = ['todo', 'in_progress', 'done'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

function validateTask(body, isUpdate = false) {
  const errors = [];

  if (!isUpdate || body.title !== undefined) {
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length < 1) {
      errors.push({ field: 'title', message: 'Title is required' });
    } else if (body.title.trim().length > 200) {
      errors.push({ field: 'title', message: 'Title must be 200 characters or less' });
    }
  }

  if (body.status !== undefined && !VALID_STATUSES.includes(body.status)) {
    errors.push({ field: 'status', message: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  if (body.priority !== undefined && !VALID_PRIORITIES.includes(body.priority)) {
    errors.push({ field: 'priority', message: `Priority must be one of: ${VALID_PRIORITIES.join(', ')}` });
  }

  if (body.description !== undefined && typeof body.description === 'string' && body.description.length > 2000) {
    errors.push({ field: 'description', message: 'Description must be 2000 characters or less' });
  }

  return { valid: errors.length === 0, errors };
}

function validateStatus(body) {
  const errors = [];
  if (!body.status || !VALID_STATUSES.includes(body.status)) {
    errors.push({ field: 'status', message: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
  }
  return { valid: errors.length === 0, errors };
}

module.exports = { validateTask, validateStatus, VALID_STATUSES, VALID_PRIORITIES };
