import { prisma } from "../../data";
import { CreateParataDto, CustomError, PaginationDto, UpdateParadaDto } from "../../domain";

export class ParadaService {
    constructor() {}

    public async getParadas(paginationDto: PaginationDto) {
        const { limit, page } = paginationDto;
        const { parada } = prisma;

        const [total, paradas] = await Promise.all([
            parada.count(),
            parada.findMany({ skip: (page - 1) * limit, take: limit }),
        ]);

        return { page, limit, total,
            next: `/api/parada?page=${page+1}&limit=${limit}`,
            prev: (page - 1 > 0) ? `/api/parada?page=${page-1}&limit=${limit}` : null,
            paradas
        }
    }

    public async createParada(createParadaDto: CreateParataDto) {
        const { parada, ruta } = prisma;
        const { numero_ruta } = createParadaDto;
        
        const existRuta = await ruta.findUnique({ where: { numero: numero_ruta } });
        if(!existRuta) throw CustomError.badRequest(`El numero de ruta ${numero_ruta} no existe`);
        
        return await parada.create({ data: {
            ...createParadaDto,
            id_ruta: existRuta.id,
        }});
    }

    public async updateParada(updateParadaDto: UpdateParadaDto) {
        const { parada } = prisma;
        const { id, ...data } = updateParadaDto.values;

        const existParada = await parada.findUnique({ where: { id } });
        if(!existParada) throw CustomError.badRequest('La parada no existe');

        return await parada.update({ 
            where:  { id }, 
            data
        });
    }
} 