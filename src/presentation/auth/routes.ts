import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services";
import { AuhtMiddleware } from "../middlewares";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new AuthController( new AuthService() );

        router.get('/verify-token', [
            AuhtMiddleware.validateUserJwt
        ], controller.verifyToken);
        
        router.post('/login', controller.loginUser);

        return router;
    }
}