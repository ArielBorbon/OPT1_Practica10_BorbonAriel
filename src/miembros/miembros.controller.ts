import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import  { CrearMiembroDto } from './dto/crear-miembro.dto';
import  { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';
import { Publico } from 'src/auth/decoradores/publico.decorator';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly miembrosService: MiembrosService) {}

  /** GET /miembros */
  @Publico()
  @Get()
  listar() {
    return this.miembrosService.listar();
  }

  /** GET /miembros/2 */
  @Publico()
  @Get(':id')
  async buscar(@Param('id') id: string) {
    const miembro = await this.miembrosService.buscar(Number(id));
    if (!miembro) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return miembro;
  }

  /** POST /miembros */
  @Publico()
  @Post()
  @HttpCode(201)
  crear(@Body() dto: CrearMiembroDto) {
    return this.miembrosService.crear(dto);
  }

  /** PATCH /miembros/2 */
  @Publico()
  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarMiembroDto) {
    const miembro = await this.miembrosService.actualizar(Number(id), dto);
    if (!miembro) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return miembro;
  }

  /** DELETE /miembros/2 */
  @Publico()
  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const miembro = await this.miembrosService.eliminar(Number(id));
    if (!miembro) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return miembro;
  }
}
