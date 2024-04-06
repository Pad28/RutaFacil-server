import { Validators } from "../../../config";

export class CreateRutaGuardadaDto {
    private constructor(
        public readonly id_usuario: string,
        public readonly id_ruta: string,
    ) {}

    static create(data: {[key: string]: any}): [string?, CreateRutaGuardadaDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys('id_usuario', 'id_ruta');
            validators.isUIID('id_usuario');
            validators.isUIID('id_ruta');

            return [undefined, new CreateRutaGuardadaDto(
                data.id_usuario,
                data.id_ruta,
            )];
        } catch (error) {
            return [error as string];
        }
    }
}