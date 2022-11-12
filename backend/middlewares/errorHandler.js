/**
 * Gère les erreur et les envoie au client
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function errorHandler(err, req, res, next) {

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