import { Validators } from "../../../config";

export class CreateUserDto {
    private constructor(
        public readonly correo: string,
        public readonly nombre: string,
        public readonly apellidos: string,
        public password: string,
    ) {}

    static create(obj: {[key: string]: any}): [string?, CreateUserDto?] {
        try {
            const validators = new Validators(obj);
            validators.requiredKeys('correo', 'nombre', 'apellidos', 'password');
            
            validators.isEmail('correo');
            validators.capitalizar('nombre');
            validators.capitalizar('apellidos');

            const { correo, nombre, apellidos, password } = obj;
            return [undefined, new CreateUserDto( correo, nombre, apellidos, password )];
        } catch (error) {
            return [error as string]
        }
    }
}