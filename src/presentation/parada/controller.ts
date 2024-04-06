import { Request, Response } from "express";
import { AppController } from "../controller";
import { CreateParataDto, PaginationDto, UpdateParadaDto } from "../../domain";
import { ParadaService } from "../services";

export class ParadaController extends AppController {
    constructor(
        private readonly paradaService: ParadaService,
    ) { super(); }

    public createParada = (req: Request, res: Response) => {
        const [error, createParadaDto] = CreateParataDto.create(req.body);
        if(error || !createParadaDto) return res.status(400).json({ error });
        this.paradaService.createParada(createParadaDto)
            .then(parada => res.json(parada))
            .catch(error => this.triggerError(error, res));
    }

    public getParadas = (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.params;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if(error || !paginationDto) return res.status(400).json({ error });
        this.paradaService.getParadas(paginationDto)
            .then(paradas => res.json(paradas))
            .catch(error => this.triggerError(error, res));
    }

    public updateParada = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateParadaDto] = UpdateParadaDto.create({...req.body, id});
        if(error || !updateParadaDto) return res.status(400).json({ error });
        this.paradaService.updateParada(updateParadaDto)
            .then(parada => res.json(parada))
            .catch(error => this.triggerError(error, res));
    }
}