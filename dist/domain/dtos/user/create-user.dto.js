"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const config_1 = require("../../../config");
class CreateUserDto {
    constructor(correo, nombre, apellidos, password) {
        this.correo = correo;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
    }
    static create(obj) {
        try {
            const validators = new config_1.Validators(obj);
            validators.requiredKeys('correo', 'nombre', 'apellidos', 'password');
            validators.isEmail('correo');
            validators.capitalizar('nombre');
            validators.capitalizar('apellidos');
            const { correo, nombre, apellidos, password } = obj;
            return [undefined, new CreateUserDto(correo, nombre, apellidos, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateUserDto = CreateUserDto;
