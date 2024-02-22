import { prisma } from "../../data";
import { CreateRutaDto, CustomError, DeleteRutaDto, PaginationDto, UpdateRutaDto } from "../../domain";

export class RutaService {
    constructor() {}

    public async getRutas(paginationDto: PaginationDto) {
        const { limit, page } = paginationDto;
        const { ruta } = prisma;

        const [total, rutas] = await Promise.all([
            ruta.count(),
            ruta.findMany({ skip: (page -1) * limit, take: limit }),
        ]);

        return {
            page,
            limit,
            total,
            next: `/api/ruta?page=${page+1}&limit=${limit}`,
            prev: (page - 1 > 0) ? `/api/ruta?page=${page-1}&limit=${limit}` : null,
            rutas: rutas
        };
    }
    
    public async createRuta(createRutaDto: CreateRutaDto) {
        const { ruta } = prisma;
        const existRuta = await ruta.findUnique({ where: { numero: createRutaDto.numero } });
        if(existRuta) throw CustomError.badRequest(`La ruta ${createRutaDto.numero} ya fue registrada`);

        return await ruta.create({ data: createRutaDto });
    }

    public async updateRuta(updateRutaDto: UpdateRutaDto) {
        const { ruta } = prisma;
        const { numero, ...data } = updateRutaDto.values;

        return await ruta.update({ 
            where: { numero: updateRutaDto.numero },
            data
        }); 
    }

    public async deleteRuta(deleteRutaDto: DeleteRutaDto) {
        const { ruta } = prisma;
        const existRuta = await ruta.findUnique({ where: { numero: deleteRutaDto.numero } });
        if(!existRuta) throw CustomError.badRequest(`La ruta ${deleteRutaDto.numero} no existe`);

        return await ruta.delete({ where: { numero: deleteRutaDto.numero } });
    }

}