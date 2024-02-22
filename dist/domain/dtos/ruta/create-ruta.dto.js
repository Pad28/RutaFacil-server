"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRutaDto = void 0;
const config_1 = require("../../../config");
class CreateRutaDto {
    constructor(numero, destino, origen, longitudDestino, latitudDestino, longitudOrigen, latitudOrigen) {
        this.numero = numero;
        this.destino = destino;
        this.origen = origen;
        this.longitudDestino = longitudDestino;
        this.latitudDestino = latitudDestino;
        this.longitudOrigen = longitudOrigen;
        this.latitudOrigen = latitudOrigen;
    }
    static create(obj) {
        try {
            const validators = new config_1.Validators(obj);
            validators.requiredKeys('numero', 'destino', 'origen');
            validators.isNumber('numero');
            validators.capitalizar('destino');
            validators.capitalizar('origen');
            if (obj.longitudDestino)
                validators.isNumber('longitudDestino');
            if (obj.latitudDestino)
                validators.isNumber('latitudDestino');
            if (obj.longitudOrigen)
                validators.isNumber('longitudOrigen');
            if (obj.latitudOrigen)
                validators.isNumber('latitudOrigen');
            return [undefined, new CreateRutaDto(obj.numero, obj.destino, obj.origen, obj.longitudDestino, obj.latitudDestino, obj.longitudOrigen, obj.latitudOrigen)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateRutaDto = CreateRutaDto;
