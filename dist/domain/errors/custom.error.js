"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, messagge) {
        super(messagge);
        this.statusCode = statusCode;
        this.messagge = messagge;
    }
    static badRequest(message) {
        return new CustomError(400, message);
    }
    static unauthorized(message) {
        return new CustomError(401, message);
    }
    static forbidden(message) {
        return new CustomError(450, message);
    }
    static notFound(message) {
        return new CustomError(404, message);
    }
    static internalServerError(message = 'Error interno del servidor') {
        return new CustomError(500, message);
    }
}
exports.CustomError = CustomError;
