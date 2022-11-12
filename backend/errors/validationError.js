export class ValidationError extends Error {
    constructor(message, statusCode, details = null) {
        super(message);
        this.statusCode = statusCode || 500;
        if (!details) {
            this.details = details;
        }
    }

    sendError(res) {
        return res.status(this.statusCode).json({
            error: {
                message: err.message,
                details: err?.details
            }
        })
    }
}