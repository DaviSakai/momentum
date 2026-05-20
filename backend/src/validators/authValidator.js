/**
 * Validate registration input.
 * Returns { valid, errors } where errors is an array of { field, message }.
 */
function validateRegistration(body) {
  const errors = [];

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name is required (minimum 2 characters)' });
  } else if (body.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be 100 characters or less' });
  }

  if (!body.email || typeof body.email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!body.password || typeof body.password !== 'string') {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (body.password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  } else if (body.password.length > 128) {
    errors.push({ field: 'password', message: 'Password must be 128 characters or less' });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate login input.
 */
function validateLogin(body) {
  const errors = [];

  if (!body.email || typeof body.email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  }

  if (!body.password || typeof body.password !== 'string') {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validateRegistration, validateLogin };
