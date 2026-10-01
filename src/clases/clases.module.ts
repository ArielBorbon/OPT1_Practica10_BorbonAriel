import { Module } from '@nestjs/common';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { ClaseMemoriaRepository } from './infra/clase-memoria.repository';
import { CLASE_REPOSITORY } from './clases.tokens';
import { ClasePrismaRepository } from './infra/clase-prisma.repository';

@Module({
  controllers: [ClasesController],
  providers: [
    ClasesService,
    {
      provide: CLASE_REPOSITORY,
      useClass: ClasePrismaRepository,
      //         ^^^^^^^^^^^^^^^^^^^^^^
      // Practica 8 (Prisma): esta linea pasa a ClasePrismaRepository.
      // Ni el Service ni el Controller se enteran.
    },
  ],
})
export class ClasesModule {}
