const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errors');

const authEnabled = () => String(process.env.AUTH_ENABLED || 'true').toLowerCase() !== 'false';

// Protects write endpoints (and all reads except where noted) when AUTH_ENABLED is true.
function requireAuth(req, _res, next) {
  if (!authEnabled()) return next();
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return next(new AppError(401, 'Authentication required'));
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return next(new AppError(401, 'Invalid or expired token'));
  }
}

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function notFoundHandler(req, _res, next) {
  next(new AppError(404, `Route not found: ${req.method} ${req.path.slice(0, 100)}`));
}

// Single place that shapes every error response: consistent JSON, never a stack trace.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    const body = { error: err.message };
    if (err.fields) body.fields = err.fields;
    return res.status(err.status).json(body);
  }
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Malformed JSON in request body' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Request body too large' });
  if (err.code === 11000) return res.status(409).json({ error: 'A record with the same unique value already exists' });
  if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).json({ error: 'Invalid input' });
  if (process.env.NODE_ENV !== 'test') console.error('Unhandled error:', err.message);
  return res.status(500).json({ error: 'Internal server error' });
}

module.exports = { requireAuth, authEnabled, wrap, notFoundHandler, errorHandler };
