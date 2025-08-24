import { env } from "../config/index.js";

export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  const payload = {
    message: err.message || 'Internal Server Error',
  };

  // Only show stack trace in non-production
  if (env.NODE_ENV !== 'production' && err.stack) {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}
