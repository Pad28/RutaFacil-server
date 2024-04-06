import { Request, Response } from "express";
import { AppController } from "../controller";
import { CreateUserDto, GetUserDto, PaginationDto, UpdateUserDto } from "../../domain";
import { UserService } from "../services/user.service";

export class UserController extends AppController {
    constructor(
        private readonly userService: UserService,
    ) { super(); }

    public getUser = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, getUserDto] = GetUserDto.create({ id });
        if(error || !getUserDto) return res.status(400).json({ error });

        this.userService.getUser(getUserDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }

    public getUsers = (req: Request, res: Response) => {
        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if(error || !paginationDto) return res.status(400).json({ error });

        this.userService.getUsers(paginationDto)
            .then(users => res.json(users))
            .catch(error => this.triggerError(error, res));
    }

    public createUser = (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if(error || !createUserDto) return res.status(400).json({ error });
        
        this.userService.createUser(createUserDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }

    public updateUser =  (req: Request, res: Response) => {
        const { id } = req.params;
        const { user } = req.body;

        if(id !== user.id) return res.status(401).json({ error: 'No autorizado' });

        const [error, updateUserDto] = UpdateUserDto.create({ ...req.body, id });
        if(error || !updateUserDto) return res.status(400).json({ error });

        this.userService.updateUser(updateUserDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }
}