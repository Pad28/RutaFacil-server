import { Validators } from "../../../config";

export class UpdateUserDto {
    private constructor(
        public readonly id: string,    
        public readonly nombre?: string,    
        public readonly apellidos?: string, 
        public readonly password?: string, 
    ) {}

    get values() {
        const obj: {[key: string]: any} = {};
        for(const k in this) {
            if(this[k]) obj[k] = this[k];
        }

        return obj;
    }

    static create(obj: {[key: string]: any}): [string?, UpdateUserDto?] {
        try {
            const validator = new Validators(obj);

            if(obj.nombre) validator.capitalizar('nombre');
            if(obj.apellidos) validator.capitalizar('apellidos');

            const  { id, nombre, apellidos, password } = obj;
            return [undefined, new UpdateUserDto(id, nombre, apellidos, password)];
        } catch (error) {
            return [ error as string ]
        }
    }
}