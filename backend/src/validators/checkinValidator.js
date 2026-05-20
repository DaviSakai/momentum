function validateCheckin(body) {
  const errors = [];

  if (body.mood !== undefined && body.mood !== null) {
    if (!Number.isInteger(body.mood) || body.mood < 1 || body.mood > 5) {
      errors.push({ field: 'mood', message: 'Mood must be an integer between 1 and 5' });
    }
  }

  if (body.energy !== undefined && body.energy !== null) {
    if (!Number.isInteger(body.energy) || body.energy < 1 || body.energy > 5) {
      errors.push({ field: 'energy', message: 'Energy must be an integer between 1 and 5' });
    }
  }

  if (body.focus !== undefined && body.focus !== null) {
    if (!Number.isInteger(body.focus) || body.focus < 1 || body.focus > 5) {
      errors.push({ field: 'focus', message: 'Focus must be an integer between 1 and 5' });
    }
  }

  if (body.productivity_score !== undefined && body.productivity_score !== null) {
    if (!Number.isInteger(body.productivity_score) || body.productivity_score < 1 || body.productivity_score > 10) {
      errors.push({ field: 'productivity_score', message: 'Productivity score must be an integer between 1 and 10' });
    }
  }

  if (body.sleep_hours !== undefined && body.sleep_hours !== null) {
    if (typeof body.sleep_hours !== 'number' || body.sleep_hours < 0 || body.sleep_hours > 24) {
      errors.push({ field: 'sleep_hours', message: 'Sleep hours must be between 0 and 24' });
    }
  }

  if (body.hydration !== undefined && body.hydration !== null) {
    if (typeof body.hydration !== 'number' || body.hydration < 0 || body.hydration > 20) {
      errors.push({ field: 'hydration', message: 'Hydration must be between 0 and 20 liters' });
    }
  }

  if (body.study_hours !== undefined && body.study_hours !== null) {
    if (typeof body.study_hours !== 'number' || body.study_hours < 0 || body.study_hours > 24) {
      errors.push({ field: 'study_hours', message: 'Study hours must be between 0 and 24' });
    }
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validateCheckin };
