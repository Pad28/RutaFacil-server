"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutasRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class RutasRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.RutasController();
        router.post('/', controller.createRuta);
        return router;
    }
}
exports.RutasRoutes = RutasRoutes;
