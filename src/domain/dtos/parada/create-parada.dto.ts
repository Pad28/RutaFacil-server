import { Validators } from "../../../config";

export class CreateParataDto {
    private constructor(
        public readonly nombre_calle: string,
        public readonly numero_ruta: number,

        public readonly longitud?: number,
        public readonly latitud?: number,
    ) {}
    
    public static create(data: {[key: string]: any}): [string?, CreateParataDto?] {
        try {
            const validators = new Validators(data);

            validators.requiredKeys('nombre_calle', 'numero_ruta');
            validators.isNumber('numero_ruta');
            validators.capitalizar('nombre_calle');

            if(data.longitud) validators.isNumber('longitud');
            if(data.latitud) validators.isNumber('latitud');

            return [undefined, new CreateParataDto(
                data.nombre_calle,
                data.numero_ruta,
                data.longitud,
                data.latitud,
            )];
        } catch (error) {
            return [error as string];
        }
    }
}