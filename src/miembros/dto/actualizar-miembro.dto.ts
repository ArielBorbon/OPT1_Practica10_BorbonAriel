import { IsString, IsNotEmpty, MaxLength, IsEmail, IsIn, IsOptional } from 'class-validator';

export class ActualizarMiembroDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  correo?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  membresia?: string;

  @IsOptional()
  activo?: boolean;
}
