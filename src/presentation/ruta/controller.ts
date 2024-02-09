import { Request, Response } from "express";
import { CreateRutaDto } from "../../domain";

export class RutasController {
    constructor() {}

    public createRuta = (req: Request, res: Response) => {
        const [ error, createRutaDto ] = CreateRutaDto.create(req.body);
        if(error || !createRutaDto) return res.status(400).json({ error })

        res.json(createRutaDto)
    }
}