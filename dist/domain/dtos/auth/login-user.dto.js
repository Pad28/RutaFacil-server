"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const config_1 = require("../../../config");
class LoginUserDto {
    constructor(correo, password) {
        this.correo = correo;
        this.password = password;
    }
    static create(obj) {
        try {
            const validators = new config_1.Validators(obj);
            validators.requiredKeys('correo', 'password');
            validators.isEmail('correo');
            const { correo, password } = obj;
            return [undefined, new LoginUserDto(correo, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.LoginUserDto = LoginUserDto;
