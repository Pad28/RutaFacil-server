export class CustomError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly messagge: string,
    ) { super(messagge) }

    static badRequest(message: string) {
        return new CustomError(400, message);
    }

    static unauthorized(message: string) {
        return new CustomError(401, message);
    }

    static forbidden(message: string) {
        return new CustomError(450, message);
    }

    static notFound(message: string) {
        return new CustomError(404, message);
    }

    static internalServerError(message: string = 'Error interno del servidor') {
        return new CustomError(500, message);
    }
}