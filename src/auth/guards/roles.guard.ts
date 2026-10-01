import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decoradores/roles.decorator';
import { Rol, PayloadJwt } from '../dominio/usuario';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(contexto: ExecutionContext): boolean {

    const rolesRequeridos = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      contexto.getHandler(),
      contexto.getClass(),
    ]);

    if (!rolesRequeridos) {
      return true;
    }

    const peticion = contexto.switchToHttp().getRequest<{ user: PayloadJwt }>();
    const usuario = peticion.user;

    return rolesRequeridos.includes(usuario.rol);
  }
}