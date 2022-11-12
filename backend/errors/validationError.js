export class ValidationError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode || 500;
        if (details) {
            this.details = details;
        }
    }
}