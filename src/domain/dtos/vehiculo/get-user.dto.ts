import { Validators } from "../../../config";

export class GetVehiculoDto {
    private constructor(
        public readonly numero: number,
    ) {}

    static create(data: {[key: string]: any}): [string?, GetVehiculoDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys('numero');
            validators.isNumber('numero');

            return [undefined, new GetVehiculoDto(data.numero)];
        } catch (error) {
            return [error as string];
        }
    }
}