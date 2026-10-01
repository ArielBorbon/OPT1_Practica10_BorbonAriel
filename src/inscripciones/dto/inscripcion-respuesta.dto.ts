import { Inscripcion } from '../dominio/entidades';

export class InscripcionResponseDto {
  id!: number;
  horarioId!: number;
  miembroId!: number;
  estado!: string;
  creadaEn!: string;
}

export function aInscripcionDto(i: Inscripcion): InscripcionResponseDto {
  return {
    id: i.id,
    horarioId: i.horarioId,
    miembroId: i.miembroId,
    estado: i.estado,
    creadaEn: i.creadaEn.toISOString(),
  };
}