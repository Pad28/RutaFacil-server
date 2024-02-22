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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuhtMiddleware = void 0;
const config_1 = require("../../config");
const data_1 = require("../../data");
class AuhtMiddleware {
    static validateUserJwt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.header('Authorization');
            if (!authorization)
                return res.status(401).json({ error: 'No hay token en la peticion' });
            if (!authorization.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Token Bearer invalido' });
            }
            const token = authorization.split(' ').at(1) || '';
            try {
                const payload = yield config_1.JwtAdapter.validateToken(token);
                if (!payload)
                    return res.status(401).json({ error: 'Token no valido' });
                const user = yield data_1.prisma.usuario.findUnique({ where: { id: payload.id } });
                if (!user)
                    return res.status(401).json({ error: 'Token no valido' });
                if (!user.estado)
                    return res.status(401).json({ error: 'Token no valido' });
                req.body.user = user;
                next();
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    static verificarRol(...roles) {
        return (req, res, next) => {
            if (!req.body.user)
                return res.status(401).json({
                    error: 'Se requiere verificar el token primero'
                });
            if (!roles.includes(req.body.user.rol))
                return res.status(401).json({
                    error: 'No autorizado'
                });
            next();
        };
    }
}
exports.AuhtMiddleware = AuhtMiddleware;
