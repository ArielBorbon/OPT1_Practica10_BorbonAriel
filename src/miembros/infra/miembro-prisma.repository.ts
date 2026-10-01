import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MiembroRepository } from '../dominio/miembro.repository';
import { Miembro } from '../dominio/entidades';
import { CrearMiembroDto } from '../dto/crear-miembro.dto';
import { ActualizarMiembroDto } from '../dto/actualizar-miembro.dto';

@Injectable()
export class MiembroPrismaRepository implements MiembroRepository {
    constructor(private readonly prisma: PrismaService) { }

    listar(): Promise<Miembro[]> {
        return this.prisma.miembro.findMany();
    }

    crear(datos: CrearMiembroDto): Promise<Miembro> {
        return this.prisma.miembro.create({ data: datos });
    }

    async buscarPorId(id: number): Promise<Miembro | null> {
        return this.prisma.miembro.findUnique({ where: { id } });
    }

    async actualizar(id: number, datos: ActualizarMiembroDto): Promise<Miembro | null> {
        const existe = await this.prisma.miembro.findUnique({ where: { id } });
        if (!existe) return null;
        return this.prisma.miembro.update({ where: { id }, data: datos });
    }

    async eliminar(id: number): Promise<Miembro | null> {
        const existe = await this.prisma.miembro.findUnique({ where: { id } });
        if (!existe) return null;
        await this.prisma.miembro.delete({ where: { id } });
        return existe;
    }
}