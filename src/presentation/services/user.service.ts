import { bcryptjsAdapter } from "../../config";
import { prisma } from "../../data";
import { CreateUserDto, CustomError, PaginationDto, UpdateUserDto } from "../../domain";

export class UserService {
    constructor() {}

    public async getUsers(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
        const { usuario } = prisma;
        
        const [total, users] = await Promise.all([
            usuario.count({ where: { estado: true } }),
            usuario.findMany({ 
                where: { estado: true }, 
                skip: (page - 1) * limit, take: limit 
            })
        ]);

        return {
            page,
            limit,
            total,
            next: `/api/user?page=${page+1}&limit=${limit}`,
            prev: (page - 1 > 0) ? `/api/user?page=${page-1}&limit=${limit}` : null,
            users: users.map(({ password, ...user }) => ({ user})) // Return implicito ({})
        };
        
    }

    public async createUser(createUserDto: CreateUserDto) {
        const { usuario } = prisma;
        const existEmail = await usuario.findUnique({ where: { correo: createUserDto.correo } });
        if(existEmail) throw CustomError.badRequest(`El correo ${createUserDto.correo} ya fue registrado`);

        createUserDto.password = bcryptjsAdapter.hash(createUserDto.password);
        const { password, ...newUser} = await usuario.create({ data: createUserDto });
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