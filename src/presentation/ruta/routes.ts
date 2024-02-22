import { Router } from "express";
import { RutasController } from "./controller";
import { AuhtMiddleware } from "../middlewares";
import { RolUsuarioEnum } from "../../data";
import { RutaService } from "../services";

export class RutasRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new RutasController( new RutaService() );
        
        router.get('/', [
            AuhtMiddleware.validateUserJwt,
        ], controller.getRutas)

        router.post('/', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ], controller.createRuta);

        router.put('/:numero', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ], controller.updateRuta);

        router.delete('/:numero', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ], controller.deleteRuta);

        return router;
    }
}