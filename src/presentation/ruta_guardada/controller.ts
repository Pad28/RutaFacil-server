import { Request, Response } from "express";
import { RutaGuardadaService } from "../services";
import { CreateRutaGuardadaDto, DeleteRutaGuardadaDto, PaginationDto } from "../../domain";
import { AppController } from "../controller";

export class RutaGuardadaController extends AppController{
    constructor (
        private readonly rutaGuradadaservice: RutaGuardadaService,
    ) { super(); }

    public getRutas = (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.params;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if(error || !paginationDto) return res.status(400).json({ error });

        this.rutaGuradadaservice.getRutasGuardadas(paginationDto)
            .then(rutas => res.json(rutas))
            .catch(error => this.triggerError(error, res)); 
    }

    public createRuta = (req: Request, res: Response) => {
        const [error, createRutaGuardadaDto] = CreateRutaGuardadaDto.create(req.body);
        if(error || !createRutaGuardadaDto) return res.status(400).json({ error });

        const { user } = req.body;
        if(createRutaGuardadaDto.id_usuario !== user.id) {
            return res.status(401).json({ error: 'No autorizado' });
        }        

        this.rutaGuradadaservice.createRutaGuardada(createRutaGuardadaDto)
            .then(ruta => res.json(ruta))
            .catch(error => this.triggerError(error, res));
    }

    public deleteRuta = (req: Request, res: Response) => {
        const { user } = req.body;
        const { id } = req.params;
        const [error, deleteRutaGuardadaDto] = DeleteRutaGuardadaDto.create({
            id_usuario: user.id,
            id,
        });
        if(error || !deleteRutaGuardadaDto) return res.status(400).json({ error });
        this.rutaGuradadaservice.deleteRutaGuadada(deleteRutaGuardadaDto)
            .then(ruta => res.json(ruta))
            .catch(error => this.triggerError(error, res));
    }
}