import { Router } from "express";
import { RutaGuardadaController } from "./controller";
import { RutaGuardadaService } from "../services";
import { AuhtMiddleware } from "../middlewares";
import { RolUsuarioEnum } from "../../data";

export class RutaGuardadaRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new RutaGuardadaController(
            new RutaGuardadaService()
        );

        router.get('/', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ], controller.getRutas);
        
        router.post('/', [
            AuhtMiddleware.validateUserJwt,
        ], controller.createRuta);
        
        router.delete('/:id', [
            AuhtMiddleware.validateUserJwt,
        ], controller.deleteRuta);

        return router;
    }
}