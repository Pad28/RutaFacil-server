import { Validators } from "../../../config";

export class DeleteRutaDto {
    private constructor(
        public readonly numero: number,
    ) {}

    static create(obj: {[key: string]: any}): [string?, DeleteRutaDto?] {
        try {
            
            const validators = new Validators(obj);
            validators.isRequired('numero');
            validators.isNumber('numero');

            return [undefined, new DeleteRutaDto(obj.numero)];
        } catch (error) {
            return [error as string];
        }
    }
}