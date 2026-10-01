import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class CrearInscripcionDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  horarioId!: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  miembroId!: number;
  
}