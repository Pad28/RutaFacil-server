import { Router } from "express";
import { VehiculoController } from "./controller";
import { VehiculoService } from "../services";
import { AuhtMiddleware } from "../middlewares";
import { RolUsuarioEnum } from "../../data";

export class VehiculoRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new VehiculoController(
            new VehiculoService()
        );

        router.get('/', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ], controller.getVehiculos);

        router.get('/:id', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ], controller.getVehiculo);
        
        router.post('/', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ], controller.createVehiculo);
        
        router.put('/:id', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ], controller.updateVehiculo);

        return router;
    }
}