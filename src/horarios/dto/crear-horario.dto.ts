import { IsInt, Min, Matches, IsNotEmpty, IsString } from 'class-validator';

export class CrearHorarioDto {
  @IsInt()
  @Min(1)
  claseId: number = 1;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  horaInicio: string = "";

  @IsString()
  @IsNotEmpty()
  dia: string = "";

  @IsInt()
  @Min(1)
  cupoMaximo: number = 1;

  @IsString()
  @IsNotEmpty()
  entrenador: string = "";
}