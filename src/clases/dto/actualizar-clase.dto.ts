import { IsString, MaxLength, IsOptional } from 'class-validator';

export class ActualizarClaseDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  nombre?: string;
}