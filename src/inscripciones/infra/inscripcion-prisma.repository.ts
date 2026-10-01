import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InscripcionRepository } from '../dominio/inscripcion.repository';
import { Inscripcion } from '../dominio/entidades';
import { CrearInscripcionDto } from '../dto/crear-inscripcion.dto';

@Injectable()
export class InscripcionPrismaRepository implements InscripcionRepository {
    constructor(private readonly prisma: PrismaService) { }
    async listar(): Promise<Inscripcion[]> {
        return this.prisma.inscripcion.findMany();
    }
    async cancelar(id: number): Promise<Inscripcion | null> {
        const existe = await this.prisma.inscripcion.findUnique({ where: { id } });
        if (!existe) return null;
        await this.prisma.inscripcion.delete({ where: { id } });
        return existe;
    }


    async buscarPorId(id: number): Promise<Inscripcion | null> {
        return this.prisma.inscripcion.findUnique({ where: { id } });
    }

    async guardar(datos: CrearInscripcionDto): Promise<Inscripcion> {
        return this.prisma.inscripcion.create({ data: datos });
    }

    async eliminar(id: number): Promise<boolean> {
        const existe = await this.prisma.inscripcion.findUnique({ where: { id } });
        if (!existe) return false;
        await this.prisma.inscripcion.delete({ where: { id } });
        return true;
    }

    async buscarPorHorario(horarioId: number): Promise<Inscripcion[]> {
        return this.prisma.inscripcion.findMany({ where: { horarioId } });
    }

    async buscarHorario(horarioId: number): Promise<any> {
        return this.prisma.horario.findUnique({ where: { id: horarioId } });
    }

    async buscarMiembro(miembroId: number): Promise<any> {
        return this.prisma.miembro.findUnique({ where: { id: miembroId } });
    }
}