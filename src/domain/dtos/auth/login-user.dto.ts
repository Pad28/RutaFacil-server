import { Validators } from "../../../config";

export class LoginUserDto {
    private constructor(
        public readonly correo: string,
        public readonly password: string,
    ) {}

    static create(obj: {[key: string]: any}): [string?, LoginUserDto?] {
        try {
            const validators = new Validators(obj);
            validators.requiredKeys('correo', 'password');
            validators.isEmail('correo');

            const { correo, password } = obj;
            return [undefined, new LoginUserDto(correo, password)];
        } catch (error) {
            return [error as string];
        }
    }
}