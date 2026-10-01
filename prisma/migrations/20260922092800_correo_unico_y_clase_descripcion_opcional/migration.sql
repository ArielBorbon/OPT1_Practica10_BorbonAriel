/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `miembros` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `clases` MODIFY `descripcion` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `miembros_correo_key` ON `miembros`(`correo`);
