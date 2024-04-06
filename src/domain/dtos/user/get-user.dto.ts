import { Validators } from "../../../config";

export class GetUserDto {
    private constructor(
        public readonly id: string,
    ) {}

    static create(data: {[key: string]: any}): [string?, GetUserDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys('id');
            validators.isUIID('id');

            return [undefined, new GetUserDto(data.id)];
        } catch (error) {
            return [error as string];
        }
    }
}