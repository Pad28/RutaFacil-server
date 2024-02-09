import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";
import { RutasRoutes } from "./ruta/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/ruta', RutasRoutes.routes);
        router.use('/api/user', UserRoutes.routes);

        return router;
    }
}