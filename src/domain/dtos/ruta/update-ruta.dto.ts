import { Validators } from "../../../config";

export class UpdateRutaDto {
    private constructor(
        public readonly numero: number,
        public readonly destino?: string,
        public readonly origen?: string,
        public readonly longitudDestino?: number,
        public readonly latitudDestino?: number,
        public readonly longitudOrigen?: number,
        public readonly latitudOrigen?: number,
    ) {}
    
    get values() {
        const obj: {[key: string]: any} = {};
        for(const k in this) {
            if(this[k]) obj[k] = this[k];
        }

        return obj;
    }

    static create(obj: {[key: string]: any}): [string?, UpdateRutaDto?] {
        try {
            const validators = new Validators(obj);
            validators.isRequired('numero');
            validators.isNumber('numero');

            if(obj.destino) validators.capitalizar('destino');
            if(obj.origen) validators.capitalizar('origen');
            if(obj.longitudDestino) validators.isFloat('longitudDestino');
            if(obj.latitudDestino) validators.isFloat('latitudDestino');
            if(obj.longitudOrigen) validators.isFloat('longitudOrigen');
            if(obj.latitudOrigen) validators.isFloat('latitudOrigen');
            
            return [undefined, new UpdateRutaDto(
                obj.numero,
                obj.destino,
                obj.origen,
                obj.longitudDestino,
                obj.latitudDestino,
                obj.longitudOrigen,
                obj.latitudOrigen,
            )];
        } catch (error) {
            return [error as string];
        }
    }
}