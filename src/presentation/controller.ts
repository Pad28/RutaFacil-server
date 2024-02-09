import { Response } from "express";
import { CustomError } from "../domain";

export class AppController {
    protected tirggerError = (error: unknown, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}