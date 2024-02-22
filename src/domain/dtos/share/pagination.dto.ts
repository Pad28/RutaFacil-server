import { Validators } from "../../../config";

export class PaginationDto {
    private constructor(
        public readonly page: number,
        public readonly limit: number,
    ) {}

    static create(page: number = 1, limit: number = 10): [string?, PaginationDto?] {
        try {
            const validators = new Validators({ page, limit });
            validators.isNumber('page');
            validators.isNumber('limit');
            if(page <= 0) throw 'Pagina debe ser mayor a 0';
            if(limit <= 0) throw 'Limite debe ser mayor a 0';

            return [undefined, new PaginationDto(page, limit)];
        } catch (error) {
            return [error as string];            
        }
    }
}