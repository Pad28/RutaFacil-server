/*
  Warnings:

  - You are about to drop the column `apellidos_chofer` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `id_usuario` on the `Vehiculo` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_chofer` on the `Vehiculo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_chofer]` on the table `Vehiculo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_chofer` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Vehiculo` DROP FOREIGN KEY `Vehiculo_id_usuario_fkey`;

-- AlterTable
ALTER TABLE `Vehiculo` DROP COLUMN `apellidos_chofer`,
    DROP COLUMN `id_usuario`,
    DROP COLUMN `nombre_chofer`,
    ADD COLUMN `id_chofer` VARCHAR(36) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Vehiculo_id_chofer_key` ON `Vehiculo`(`id_chofer`);

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_id_chofer_fkey` FOREIGN KEY (`id_chofer`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
