import { Request, Response } from "express";
import { AppController } from "../controller";
import { CreateUserDto, UpdateUserDto } from "../../domain";
import { UserService } from "../services/user.service";

export class UserController extends AppController {
    constructor(
        private readonly userService: UserService,
    ) { super() }

    public createUser = (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if(error || !createUserDto) return res.status(400).json({ error });
        
        this.userService.createUser(createUserDto)
            .then(user => res.json(user))
            .catch(error => this.tirggerError(error, res));
    }

    public updateUser =  (req: Request, res: Response) => {
        const { id } = req.params;
        const { user } = req.body;

        if(id !== user.id) return res.status(401).json({ error: 'No autorizado' });

        const [error, updateUserDto] = UpdateUserDto.create({ ...req.body, id });
        if(error || !updateUserDto) return res.status(400).json({ error });

        this.userService.updateUser(updateUserDto)
            .then(user => res.json(user))
            .catch(error => this.tirggerError(error, res));
    }
}