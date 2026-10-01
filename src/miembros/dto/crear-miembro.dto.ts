import { IsString, IsNotEmpty, MaxLength, IsEmail, IsIn } from 'class-validator';

export class CrearMiembroDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre: string = "";

  @IsEmail({})
  @IsNotEmpty()
  correo: string = "";

  @IsString()
  @IsNotEmpty()
  membresia: string = "";
}