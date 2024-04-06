import { Validators } from "../../../config";
import { AppDto } from "../share/AppDto";

export class UpdateParadaDto extends AppDto {
    private constructor(
        public readonly id: string,
        public readonly nombre_calle?: string,
        public readonly numero_ruta?: number,

        public readonly longitud?: number,
        public readonly latitud?: number,
    ) { super() }

    static create(data: {[key: string]: any}): [string?, UpdateParadaDto?] {
        try {
            const validators = new Validators(data);
            validators.isRequired('id');
            
            validators.ifExistCapitalizar('nombre_calle');
            validators.ifExistIsNumber('numero_ruta');
            validators.ifExistIsNumber('longitud');
            validators.ifExistIsNumber('latitud');
3
            return [undefined, new UpdateParadaDto(
                data.id,
                data.nombre_calle,
                data.numero_ruta,
                data.longitud,
                data.latitud,
            )]
        } catch (error) {
            return [error as string]
        }
    }
}
