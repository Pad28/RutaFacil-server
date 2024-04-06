import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services";
import { AuhtMiddleware } from "../middlewares";
import { RolUsuarioEnum } from "../../data";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new UserController( new UserService() );

        router.get('/', [
            AuhtMiddleware.validateUserJwt,
            AuhtMiddleware.verificarRol(RolUsuarioEnum.ADMIN),
        ], controller.getUsers);

        router.get('/:id', [
            AuhtMiddleware.validateUserJwt,
        ], controller.getUser);
        
        router.post('/', controller.createUser);

        router.put('/:id', [
            AuhtMiddleware.validateUserJwt
        ], controller.updateUser);

        return router;
    }
}