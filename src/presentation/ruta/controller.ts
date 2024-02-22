import { Request, Response } from "express";
import { CreateRutaDto, DeleteRutaDto, PaginationDto, UpdateRutaDto } from "../../domain";
import { RutaService } from "../services";
import { AppController } from "../controller";

export class RutasController extends AppController{
    constructor(
        private readonly rutaService: RutaService,
    ) { super(); }

    public getRutas = (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.params;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if(error || !paginationDto) return res.status(400).json({ error });

        this.rutaService.getRutas(paginationDto)
            .then(rutas => res.json(rutas))
            .catch(error => this.triggerError(error, res));
    }

    public createRuta = (req: Request, res: Response) => {
        const [ error, createRutaDto ] = CreateRutaDto.create(req.body);
        if(error || !createRutaDto) return res.status(400).json({ error })
        this.rutaService.createRuta(createRutaDto)
            .then(ruta => res.json(ruta))
            .catch(error => this.triggerError(error, res));
    }

    public updateRuta = (req: Request, res: Response) => {
        const { numero } = req.params; 

        const [error, updateRutaDto] = UpdateRutaDto.create({...req.body, numero});
        if(error || !updateRutaDto) return res.status(400).json({ error });
        this.rutaService.updateRuta(updateRutaDto)
            .then(ruta => res.json(ruta))
            .catch(error => this.triggerError(error, res));
    }

    public deleteRuta = (req: Request, res: Response) => {
        const { numero } = req.params;
        const [ error, deleteRutaDto ] = DeleteRutaDto.create({ numero });
        if(error || !deleteRutaDto) return res.status(400).json({ error });
        this.rutaService.deleteRuta(deleteRutaDto)
            .then(ruta => res.json(ruta))
            .catch(error => this.triggerError(error, res));
    }
}