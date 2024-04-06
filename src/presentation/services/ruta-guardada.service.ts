import { prisma } from "../../data";
import { CreateRutaGuardadaDto, CustomError, DeleteRutaGuardadaDto, PaginationDto } from "../../domain";

export class RutaGuardadaService {
    constructor() {}

    public async getRutasGuardadas(paginationDto: PaginationDto) {
        const { limit, page } = paginationDto;
        const { rutaGuardada } = prisma;
        
        const [total, rutas_guardadas] = await Promise.all([
            rutaGuardada.count(),
            rutaGuardada.findMany({
                skip: (page -1) * limit,
                take: limit,
                include: { 
                    fk_usuario: {
                        select: { id: true, correo: true, nombre: true, apellidos: true}
                    }, 
                    fk_ruta: true 
                }
            }),
        ]);

        return {
            page,
            limit,
            total,
            next: `/api/ruta_guardada?page=${page+1}&limit=${limit}`,
            prev: (page -1 > 0) ? `/api/ruta_guardada?page=${page-1}&limit=${limit}` : null,
            rutas_guardadas,
        }
    }

    public async createRutaGuardada (createRutaGuardadaDto: CreateRutaGuardadaDto) {
        const { rutaGuardada, usuario, ruta } = prisma;
        const { id_ruta, id_usuario } = createRutaGuardadaDto;

        const [existUser, existRuta] = await Promise.all([
            usuario.findUnique({ where: { id: id_usuario } }),
            ruta.findUnique({ where: { id: id_ruta } }),
        ]);
        if(!existUser) throw CustomError.badRequest("Chofer no existente");
        if(!existRuta) throw CustomError.badRequest("Ruta no existente");

        return await rutaGuardada.create({
            data: createRutaGuardadaDto,
        })
    }

    public async deleteRutaGuadada (deleteRutaGuadadaDto: DeleteRutaGuardadaDto) {
        const { rutaGuardada } = prisma;
        const { id, id_usuario } = deleteRutaGuadadaDto;
        const existRuta = await rutaGuardada.findUnique({ where: { id, id_usuario } });
        if(!existRuta) throw CustomError.badRequest("Registro no existente");

        return await rutaGuardada.delete({ where: { id: deleteRutaGuadadaDto.id } });
    }
}