"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.AuthController(new services_1.AuthService());
        router.get('/verify-token', [
            middlewares_1.AuhtMiddleware.validateUserJwt
        ], controller.verifyToken);
        router.post('/login', controller.loginUser);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
