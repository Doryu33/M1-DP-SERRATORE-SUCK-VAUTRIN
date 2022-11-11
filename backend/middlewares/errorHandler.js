/**
 * Gère les erreur et les envoie au client
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    error: {
      message: err.message,
      details: err?.details
    }
  })
}

/**
 * Signale une route invalide
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export function wrongRouteHandler(req, res) {
  return res.status(404).json({
    error: {
      message: "Invalid route",
    }
  });
}

/**
 * Décrit l'erreur et le code à renvoyer au client
 * @param {Number} statusCode 
 * @param {String} message 
 * @param {Object} details 
 */
export function throwError(statusCode, message, details) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  throw error;
}