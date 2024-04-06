import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";
import { RutasRoutes } from "./ruta/routes";
import { HorarioRoutes } from "./horario/routes";
import { ParadasRoutes } from "./parada/routes";
import { VehiculoRoutes } from "./vehiculo/routes";
import { RutaGuardadaRoutes } from "./ruta_guardada/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/horario', HorarioRoutes.routes);
        router.use('/api/parada', ParadasRoutes.routes);
        router.use('/api/ruta', RutasRoutes.routes);
        router.use('/api/user', UserRoutes.routes);
        router.use('/api/vehiculo', VehiculoRoutes.routes);
        router.use('/api/ruta_guardada', RutaGuardadaRoutes.routes);

        return router;
    }
}