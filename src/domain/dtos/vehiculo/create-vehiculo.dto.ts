import { Validators } from "../../../config";

export class CreateVehiculoDto {
    private constructor(
        public readonly numero: number,
        public readonly id_chofer: string,
        public readonly id_ruta: string,
    ) {}

    static create(data: {[key: string]: any}): [string?, CreateVehiculoDto?] {
        try {
            const validators = new Validators(data);

            validators.requiredKeys('numero', 'id_chofer', 'id_ruta');
            validators.isNumber('numero');
            validators.isUIID('id_chofer');
            validators.isUIID('id_ruta');

            return [undefined, new CreateVehiculoDto(
                data.numero, 
                data.id_chofer, 
                data.id_ruta
            )];
        } catch (error) {
            return [error as string];
        }
    }
}