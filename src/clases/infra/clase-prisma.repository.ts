import { Injectable } from '@nestjs/common';
import { ClaseRepository } from '../dominio/clase.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Clase } from '../dominio/entidades';
import { CrearClaseDto } from '../dto/crear-clase.dto';
import { ActualizarClaseDto } from '../dto/actualizar-clase.dto';

@Injectable()
export class ClasePrismaRepository implements ClaseRepository {
    constructor(private readonly prisma: PrismaService) { }


    listar(): Promise<Clase[]> {
        return this.prisma.clase.findMany();
    }

    crear(datos: CrearClaseDto): Promise<Clase> {
        return this.prisma.clase.create({ data: datos });
    }

    async buscarPorId(id: number): Promise<Clase | null> {
        return this.prisma.clase.findUnique({ where: { id } });
    }

    async actualizar(id: number, datos: ActualizarClaseDto): Promise<Clase | null> {
        const existe = await this.prisma.clase.findUnique({ where: { id } });
        if (!existe) return null;

        return this.prisma.clase.update({
            where: { id },
            data: datos
        });
    }

    async eliminar(id: number): Promise<Clase | null> {
        const existe = await this.prisma.clase.findUnique({ where: { id } });
        if (!existe) return null;

        await this.prisma.clase.delete({ where: { id } });
        return existe;
    }
}