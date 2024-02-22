import { prisma } from "../../data";
import { CreateHorarioDto, CustomError, PaginationDto } from "../../domain";

export class HorarioService {
    constructor () {}

    public async getHorarios(paginationDto: PaginationDto) {
        const { limit, page } = paginationDto;
        const { horario } = prisma;

        const [total, horarios] = await Promise.all([
            horario.count(),
            horario.findMany({ skip: (page - 1) * limit, take: limit }),
        ]);
        return {
            page,
            limit,
            total,
            next: `/api/horario?page=${page+1}&limit=${limit}`,
            prev: (page - 1 > 0) ? `/api/horario?page=${page-1}&limit=${limit}` : null,
            horarios: horarios
        }        
    }

    public async createHorario(createHorarioDto: CreateHorarioDto) {
        const { horario, ruta } = prisma;
        const [existRuta, existHorario] = await Promise.all([
            ruta.findFirst({ where: { numero: createHorarioDto.numero_ruta } }),
            horario.findFirst({ where: { 
                dia_hora: createHorarioDto.dia_hora,
                numero_ruta: createHorarioDto.numero_ruta 
            }})
        ]);

        if(!existRuta) {
            throw CustomError.badRequest(`La ruta ${createHorarioDto.numero_ruta} no es valida`);
        }
        if(existHorario) {
            throw CustomError.badRequest( `El horario ${createHorarioDto.dia_hora}` + 
            ` ya fue registrado para la ruta ${createHorarioDto.numero_ruta}`);
        }

        return await horario.create({ 
            data: {
                dia_hora: createHorarioDto.dia_hora,
                numero_ruta: createHorarioDto.numero_ruta,
                id_ruta: existRuta.id
            }
        });
    }
}