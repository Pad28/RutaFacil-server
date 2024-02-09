import { bcryptjsAdapter } from "../../config";
import { prisma } from "../../data";
import { CreateUserDto, CustomError, UpdateUserDto } from "../../domain";

export class UserService {
    constructor() {}

    public async createUser(createUserDto: CreateUserDto) {
        const { usuario } = prisma;
        const existEmail = await usuario.findUnique({ where: { correo: createUserDto.correo } });
        if(existEmail) throw CustomError.badRequest(`El correo ${createUserDto.correo} ya fue registrado`);

        createUserDto.password = bcryptjsAdapter.hash(createUserDto.password);
        const newUser = await usuario.create({ data: createUserDto });
        return newUser;
    }

    public async updateUser(updateUserDto: UpdateUserDto) {
        const { usuario } = prisma;
        const data = updateUserDto.values;

        if(data.password) {
            data.password = bcryptjsAdapter.hash(data.password);
        }

        const update = await usuario.update({
            where: { id: updateUserDto.id },
            data
        });

        const { password, ...rest } = update;
        return rest;
    }
}