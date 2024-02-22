import { Validators } from "../../../config";

export class CreateHorarioDto {
    private constructor(
        public readonly dia_hora: Date,
        public readonly numero_ruta: number,
    ) {}

    static create(obj: {[key: string]: any}): [string?, CreateHorarioDto?] {
        try {
            const validators = new Validators(obj);
            validators.requiredKeys('dia_hora', 'numero_ruta');
            validators.isDate('dia_hora');
            validators.isNumber('numero_ruta');

            return [undefined, new CreateHorarioDto(obj['dia_hora'], obj['numero_ruta'])];
        } catch (error) {
            return [error as string]
        }
    }
}