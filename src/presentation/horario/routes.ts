import { Router } from "express";
import { HorarioController } from "./controller";
import { AuhtMiddleware } from "../middlewares";
import { RolUsuarioEnum } from "../../data";
import { HorarioService } from "../services";

export class HorarioRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new HorarioController( new HorarioService() );

        router.get('/', [
            AuhtMiddleware.validateUserJwt
        ], controller.getHorarios)

        router.post('/', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN)
        ], controller.createHorario)

        return router;
    }
}