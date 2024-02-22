"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = require("../../config");
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class AuthService {
    loginUser(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const result = yield usuario.findUnique({ where: { correo: loginUserDto.correo } });
            if (!result)
                throw domain_1.CustomError.badRequest('Correo o constraseña no valido');
            if (!result.estado)
                throw domain_1.CustomError.badRequest('Correo o constraseña no valido');
            const isMatching = config_1.bcryptjsAdapter.compare(loginUserDto.password, result.password);
            if (!isMatching)
                throw domain_1.CustomError.badRequest('Correo o constraseña no valido');
            const token = yield config_1.JwtAdapter.generateToken({ id: result.id });
            if (!token)
                throw domain_1.CustomError.internalServerError();
            const { password } = result, data = __rest(result, ["password"]);
            return {
                user: data,
                token
            };
        });
    }
}
exports.AuthService = AuthService;
