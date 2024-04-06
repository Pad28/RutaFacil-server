import { Request, Response } from "express";
import { AppController } from "../controller";
import { CreateVehiculoDto, GetVehiculoDto, PaginationDto, UpdateVehiculoDto } from "../../domain";
import { VehiculoService } from "../services";

export class VehiculoController extends AppController {
    constructor(
        private readonly vehiculoService: VehiculoService,
    ) { super(); }

    public getVehiculo = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, getVehiculoDto] = GetVehiculoDto.create({ numero: id });
        if(error || !getVehiculoDto) return res.status(400).json({ error });

        this.vehiculoService.getVehiculo(getVehiculoDto)
            .then(vehiculo => res.json(vehiculo))
            .catch(error => this.triggerError(error, res));
    }

    public getVehiculos = (req: Request, res: Response) => {
        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if(error || !paginationDto) return res.status(400).json({ error });

        this.vehiculoService.getVehiculos(paginationDto)
            .then(vehiculos => res.json(vehiculos))
            .catch(error => this.triggerError(error, res));
    }

    public createVehiculo = (req: Request, res: Response) => {
        const [error, createVehiculoDto] = CreateVehiculoDto.create(req.body);
        if(error || !createVehiculoDto) return res.status(400).json({ error });
        
        this.vehiculoService.createVehiculo(createVehiculoDto)
            .then(vehiculo => res.json(vehiculo))
            .catch(error => this.triggerError(error, res));
    }

    public updateVehiculo =  (req: Request, res: Response) => {
        const { id } = req.params;

        const [error, updateVehiculoDto] = UpdateVehiculoDto.create({ ...req.body, numero: id });
        if(error || !updateVehiculoDto) return res.status(400).json({ error });

        this.vehiculoService.updateVehiculo(updateVehiculoDto)
            .then(vehiculo => res.json(vehiculo))
            .catch(error => this.triggerError(error, res));
    }
}