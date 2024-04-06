import { Validators } from "../../../config";
import { AppDto } from "../share/AppDto";

export class UpdateVehiculoDto extends AppDto {
    private constructor(
        public readonly numero: number,
        public readonly id_chofer?: string,
        public readonly id_ruta?: string,
    ) { super(); }

    static create(data: {[key: string]: any}): [string?, UpdateVehiculoDto?] {
        try {
            const validators = new Validators(data);

            validators.requiredKeys('numero');

            validators.ifExistIsNumber('numero');
            validators.ifExistIsUUID('id_chofer');
            validators.ifExistIsUUID('id_ruta');

            return [undefined, new UpdateVehiculoDto(
                data.numero, 
                data.id_chofer, 
                data.id_ruta
            )];
        } catch (error) {
            return [error as string];
        }
    }
}