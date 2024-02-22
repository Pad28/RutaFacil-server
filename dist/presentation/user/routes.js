"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.UserController(new services_1.UserService());
        router.post('/', controller.createUser);
        router.put('/:id', [
            middlewares_1.AuhtMiddleware.validateUserJwt
        ], controller.updateUser);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
