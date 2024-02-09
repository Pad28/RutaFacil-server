import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export const connetionDB = async() => {
    try {
        prisma.$connect();
        console.log('Base de datos conectada');
    } catch (error) {
        throw error        
    }
}
