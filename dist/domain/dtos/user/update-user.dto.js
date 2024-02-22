"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const config_1 = require("../../../config");
class UpdateUserDto {
    constructor(id, nombre, apellidos, password) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
    }
    get values() {
        const obj = {};
        for (const k in this) {
            if (this[k])
                obj[k] = this[k];
        }
        return obj;
    }
    static create(obj) {
        try {
            const validator = new config_1.Validators(obj);
            if (obj.nombre)
                validator.capitalizar('nombre');
            if (obj.apellidos)
                validator.capitalizar('apellidos');
            const { id, nombre, apellidos, password } = obj;
            return [undefined, new UpdateUserDto(id, nombre, apellidos, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateUserDto = UpdateUserDto;
