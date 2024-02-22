import { Request, Response } from "express";
import { AppController } from "../controller";
import { CreateHorarioDto, PaginationDto } from "../../domain";
import { HorarioService } from "../services";

export class HorarioController extends AppController {
    constructor(
        private readonly horarioService: HorarioService,
    ) { super(); }

    public getHorarios = (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if(error || !paginationDto) return res.status(400).json({ error });
        
        this.horarioService.getHorarios(paginationDto)
            .then(horarios => res.json(horarios))
            .catch(error  => this.triggerError(error, res));
    }

    public createHorario = (req: Request, res: Response) => {
        const [error, createHorarioDto] = CreateHorarioDto.create(req.body);
        if(error || !createHorarioDto) return res.status(400).json({ error });

        this.horarioService.createHorario(createHorarioDto)
            .then(horario => res.json(horario))
            .catch(error => this.triggerError(error, res));
    }
}