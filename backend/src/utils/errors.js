class AppError extends Error {
  constructor(status, message, fields) {
    super(message);
    this.status = status;
    this.fields = fields;
    this.expose = true;
  }
}

const badRequest = (message, fields) => new AppError(400, message, fields);
const notFound = (message) => new AppError(404, message);
const conflict = (message) => new AppError(409, message);

module.exports = { AppError, badRequest, notFound, conflict };
