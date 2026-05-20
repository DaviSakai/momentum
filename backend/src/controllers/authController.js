const userModel = require('../models/userModel');
const authService = require('../services/authService');
const { validateRegistration, validateLogin } = require('../validators/authValidator');

/**
 * POST /api/auth/register
 */
async function register(req, res, next) {
  try {
    const { valid, errors } = validateRegistration(req.body);

    if (!valid) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid registration data',
          details: errors,
        },
      });
    }

    const { name, email, password } = req.body;

    // Check duplicate email
    const existing = userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({
        error: {
          code: 'EMAIL_EXISTS',
          message: 'An account with this email already exists',
        },
      });
    }

    // Hash password and create user
    const password_hash = await authService.hashPassword(password);
    const user = userModel.createUser({ name: name.trim(), email, password_hash });

    // Generate token
    const token = authService.generateToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/login
 */
async function login(req, res, next) {
  try {
    const { valid, errors } = validateLogin(req.body);

    if (!valid) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid login data',
          details: errors,
        },
      });
    }

    const { email, password } = req.body;

    // Find user — generic error for security
    const user = userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }

    // Verify password
    const passwordValid = await authService.verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }

    // Generate token — return user without password_hash
    const token = authService.generateToken(user);
    const { password_hash, ...safeUser } = user;

    res.json({ user: safeUser, token });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/logout
 */
function logout(req, res) {
  // JWT is stateless — logout is client-side only
  res.json({ message: 'Logged out successfully' });
}

/**
 * GET /api/auth/me
 * Returns the current authenticated user's profile.
 */
function getMe(req, res, next) {
  try {
    const user = userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: { code: 'USER_NOT_FOUND', message: 'User not found' },
      });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout, getMe };
