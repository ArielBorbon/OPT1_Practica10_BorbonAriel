import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorDominio } from '../../inscripciones/dominio/errores';

@Catch(ErrorDominio) 
export class DominioExcepcionFilter implements ExceptionFilter {
    catch(exception: ErrorDominio, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception.constructor.name.includes('NoEncontrado')) {
            status = HttpStatus.NOT_FOUND;
        }
        else if (
            exception.constructor.name.includes('CupoLleno') ||
            exception.constructor.name.includes('Duplicad')
        ) {
            status = HttpStatus.CONFLICT;
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });
    }
}