/**
 * Global error handler middleware.
 * Returns consistent error shape: { error: { code, message } }
 */
function errorHandler(err, req, res, _next) {
  const statusCode = err.status || err.statusCode || 500;
  const isDev = process.env.NODE_ENV === 'development';

  console.error(`[Error] ${err.message}`, isDev ? err.stack : '');

  res.status(statusCode).json({
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: statusCode === 500 && !isDev
        ? 'Something went wrong'
        : err.message || 'Something went wrong',
    },
  });
}

module.exports = { errorHandler };
