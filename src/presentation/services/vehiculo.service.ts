import { RolUsuarioEnum, prisma } from "../../data";
import { CreateVehiculoDto, CustomError, GetVehiculoDto, PaginationDto, UpdateVehiculoDto } from "../../domain";

export class VehiculoService {
    constructor() {}
    
    public async getVehiculo(getVehiculoDto: GetVehiculoDto) {
        const { vehiculo } = prisma;
        const getVehiculo = await vehiculo.findUnique({ where: { numero: getVehiculoDto.numero } });
        if(!getVehiculo) throw CustomError.badRequest(`Vehiculo no existente`);
        return getVehiculo;
    }

    public async getVehiculos(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
        const { vehiculo } = prisma;
        
        const [total, vehiculos] = await Promise.all([
            vehiculo.count(),
            vehiculo.findMany({ 
                skip: (page - 1) * limit, 
                take: limit,
                include: { 
                    fk_ruta: true, 
                    fk_chofer: {
                        select: { id: true, correo: true, nombre: true, apellidos: true}
                    },
                }
            })
        ]);

        return {
            page,
            limit,
            total,
            next: `/api/vehiculo?page=${page+1}&limit=${limit}`,
            prev: (page - 1 > 0) ? `/api/vehiculo?page=${page-1}&limit=${limit}` : null,
            vehiculos,
        };
        
    }

    public async createVehiculo (createVehiculoDto: CreateVehiculoDto) {
        const { vehiculo, usuario, ruta } = prisma;
        const { id_chofer, id_ruta, numero } = createVehiculoDto;

        const [existUser, existRuta, existVehiculo, choferAsignado] = await Promise.all([
            usuario.findUnique({ where: { id: id_chofer, rol: RolUsuarioEnum.CHOFER } }),
            ruta.findUnique({ where: { id: id_ruta } }),
            vehiculo.findUnique({ where: { numero } }),
            vehiculo.findUnique({ where: { id_chofer: id_chofer } }),
        ]);
        if(!existUser) throw CustomError.badRequest('Chofer no existente');
        if(!existRuta) throw CustomError.badRequest('Ruta no existente');

        if(existVehiculo) throw CustomError.badRequest('Vehiculo ya registrado');
        if(choferAsignado) throw CustomError.badRequest('Chofer ya registrado en otra unidad');
        
        return await vehiculo.create({
            data: createVehiculoDto,
        })
    }

    public async updateVehiculo(updateVehiculoDto: UpdateVehiculoDto) {
        const { vehiculo, usuario, ruta } = prisma;
        const { numero, id_chofer, id_ruta } = updateVehiculoDto;
        const data = updateVehiculoDto.values;

        const existVehiculo = await vehiculo.findUnique({ where: { numero } })
        if(!existVehiculo) throw CustomError.badRequest('Vehiculo no existe');

        if(id_chofer) {
            const existChofer = await usuario.findUnique({ where: {
                id: id_chofer, 
                rol: RolUsuarioEnum.CHOFER
            }});
            if(!existChofer) throw CustomError.badRequest('Chofer no existente');
        }

        if(id_ruta) {
            const existRuta = await ruta.findUnique({ where: {
                id: id_ruta, 
            }});
            if(!existRuta) throw CustomError.badRequest('Ruta no existente');
        }

        return await vehiculo.update({
            where: { numero: updateVehiculoDto.numero },
            data
        });
    }

}