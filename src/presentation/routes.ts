import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";
import { RutasRoutes } from "./ruta/routes";
import { HorarioRoutes } from "./horario/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/horario', HorarioRoutes.routes);
        router.use('/api/ruta', RutasRoutes.routes);
        router.use('/api/user', UserRoutes.routes);

        return router;
    }
}