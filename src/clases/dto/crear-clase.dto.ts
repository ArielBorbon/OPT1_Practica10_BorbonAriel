import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CrearClaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre: string = "";

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  descripcion?: string = "";
}