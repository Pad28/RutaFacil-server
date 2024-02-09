import { Request, Response } from "express";
import { LoginUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { AppController } from "../controller";

export class AuthController extends AppController {
    constructor(
        private readonly authService: AuthService,
    ) { super() }

    public verifyToken = (req: Request, res: Response) => {
        const token = req.header('Authorization');
        res.json({ 
            user: req.body.user, 
            token: token!.split(' ').at(1) 
        });
    }

    public loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error || !loginUserDto) return res.status(400).json({ error });
        
        this.authService.loginUser(loginUserDto)
            .then(result => res.json({ ...result }))
            .catch(error => this.tirggerError(error, res));
    }
}