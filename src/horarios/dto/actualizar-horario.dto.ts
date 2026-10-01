import { IsInt, Min, Matches, IsString, IsOptional } from 'class-validator';

export class ActualizarHorarioDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  claseId?: number;

  @IsString()
  @IsOptional()
  dia?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  horaInicio?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  cupoMaximo?: number;

  @IsString()
  @IsOptional()
  entrenador?: string;
}