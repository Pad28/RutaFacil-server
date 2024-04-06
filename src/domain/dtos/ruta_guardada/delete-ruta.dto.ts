import { Validators } from "../../../config";

export class DeleteRutaGuardadaDto {
    private constructor(
        public readonly id: string,
        public readonly id_usuario: string,
    ) {}
    
    static create(data: {[key: string]: any}): [string?, DeleteRutaGuardadaDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys('id', 'id_usuario');
            validators.isUIID('id');
            validators.isUIID('id_usuario');

            return [undefined, new DeleteRutaGuardadaDto(
                data.id,
                data.id_usuario,
            )];
        } catch (error) {
            return [error as string];
        }
    }
}