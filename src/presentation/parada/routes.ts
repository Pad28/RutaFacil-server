import { Router } from "express";
import { ParadaController } from "./controller";
import { AuhtMiddleware } from "../middlewares";
import { RolUsuarioEnum } from "../../data";
import { ParadaService } from "../services";

export class ParadasRoutes {
    static get routes(): Router {
        const routes = Router();
        const controller = new ParadaController( new ParadaService() );

        routes.get('/', [
            AuhtMiddleware.validateUserJwt
        ], controller.getParadas);

        routes.post('/', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ],  controller.createParada);

        routes.put('/:id', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ],  controller.updateParada);

        return routes;
    }
}
