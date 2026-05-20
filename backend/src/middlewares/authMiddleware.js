const { verifyToken } = require('../services/authService');
const userModel = require('../models/userModel');

/**
 * Auth middleware — extracts Bearer token, verifies JWT, injects req.user.
 * Returns 401 if token is missing, expired, or invalid.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      },
    });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
      },
    });
  }

  // Verify user still exists
  const user = userModel.findById(decoded.id);
  if (!user) {
    return res.status(401).json({
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User no longer exists',
      },
    });
  }

  req.user = { id: decoded.id, email: decoded.email };
  next();
}

module.exports = { authMiddleware };
