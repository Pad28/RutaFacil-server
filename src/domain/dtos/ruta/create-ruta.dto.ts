import { Validators } from "../../../config";

export class CreateRutaDto {
    private constructor(
        public readonly numero: number,
        public readonly destino: string,
        public readonly origen: string,
        public readonly longitudDestino?: number,
        public readonly latitudDestino?: number,
        public readonly longitudOrigen?: number,
        public readonly latitudOrigen?: number,
    ) {}

    static create(obj: {[key: string]: any}): [string?, CreateRutaDto?] {
        try {
            const validators = new Validators(obj);
            validators.requiredKeys('numero', 'destino', 'origen');

            validators.isNumber('numero');
            validators.capitalizar('destino');
            validators.capitalizar('origen');

            if(obj.longitudDestino) validators.isNumber('longitudDestino');
            if(obj.latitudDestino) validators.isNumber('latitudDestino');
            if(obj.longitudOrigen) validators.isNumber('longitudOrigen');
            if(obj.latitudOrigen) validators.isNumber('latitudOrigen');
            
            return [undefined, new CreateRutaDto(
                obj.numero, 
                obj.destino, 
                obj.origen, 
                obj.longitudDestino, 
                obj.latitudDestino, 
                obj.longitudOrigen, 
                obj.latitudOrigen
            )];
        } catch (error) {
            return [error as string]
        }
    }
}