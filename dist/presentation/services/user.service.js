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
exports.UserService = void 0;
const config_1 = require("../../config");
const data_1 = require("../../data");
const domain_1 = require("../../domain");
class UserService {
    constructor() { }
    createUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const existEmail = yield usuario.findUnique({ where: { correo: createUserDto.correo } });
            if (existEmail)
                throw domain_1.CustomError.badRequest(`El correo ${createUserDto.correo} ya fue registrado`);
            createUserDto.password = config_1.bcryptjsAdapter.hash(createUserDto.password);
            const newUser = yield usuario.create({ data: createUserDto });
            return newUser;
        });
    }
    updateUser(updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = data_1.prisma;
            const data = updateUserDto.values;
            if (data.password) {
                data.password = config_1.bcryptjsAdapter.hash(data.password);
            }
            const update = yield usuario.update({
                where: { id: updateUserDto.id },
                data
            });
            const { password } = update, rest = __rest(update, ["password"]);
            return rest;
        });
    }
}
exports.UserService = UserService;
