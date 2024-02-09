import { Router } from "express";
import { RutasController } from "./controller";

export class RutasRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new RutasController();

        router.post('/', controller.createRuta);

        return router;
    }
}