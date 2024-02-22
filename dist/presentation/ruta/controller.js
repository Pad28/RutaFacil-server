"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RutasController = void 0;
const domain_1 = require("../../domain");
class RutasController {
    constructor() {
        this.createRuta = (req, res) => {
            const [error, createRutaDto] = domain_1.CreateRutaDto.create(req.body);
            if (error || !createRutaDto)
                return res.status(400).json({ error });
            res.json(createRutaDto);
        };
    }
}
exports.RutasController = RutasController;
