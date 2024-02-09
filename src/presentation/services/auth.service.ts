import { JwtAdapter, bcryptjsAdapter } from "../../config";
import { prisma } from "../../data";
import { CustomError, LoginUserDto } from "../../domain";

export class AuthService {
    
    public async loginUser(loginUserDto: LoginUserDto) {
        const { usuario } = prisma;
        const result = await usuario.findUnique({ where: { correo: loginUserDto.correo } });
        if(!result) throw CustomError.badRequest('Correo o constraseña no valido');
        
        if(!result.estado) throw CustomError.badRequest('Correo o constraseña no valido');

        const isMatching = bcryptjsAdapter.compare(loginUserDto.password, result.password);
        if(!isMatching) throw CustomError.badRequest('Correo o constraseña no valido');

        const token = await JwtAdapter.generateToken({ id: result.id });
        if(!token) throw CustomError.internalServerError();

        const { password, ...data } = result;
        return {
            user: data,
            token
        }
    }
}