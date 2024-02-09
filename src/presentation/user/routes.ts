import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services";
import { AuhtMiddleware } from "../middlewares";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new UserController( new UserService() );
        
        router.post('/', controller.createUser);

        router.put('/:id', [
            AuhtMiddleware.validateUserJwt
        ], controller.updateUser);

        return router;
    }
}