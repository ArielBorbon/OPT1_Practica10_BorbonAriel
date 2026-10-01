import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Sobre<T> {
  data: T;
  meta: {
    ruta: string;
    duracions: number;
    timestamp: string;
  };
}

@Injectable()
export class SobreInterceptor implements NestInterceptor {
  intercept(contexto: ExecutionContext, siguiente: CallHandler): Observable<Sobre<unknown>> {
    const req = contexto.switchToHttp().getRequest<{ url: string }>();
    const inicio = Date.now();

    return siguiente.handle().pipe(
      map((data) => ({
        data,
        meta: {
          ruta: req.url,
          duracions: Date.now() - inicio,
          timestamp: new Date().toISOString(),
        },
      })),
    );
  }
}