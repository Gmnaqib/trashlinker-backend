/*
  Warnings:

  - You are about to drop the column `longitud` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `longitud`,
    ADD COLUMN `longitude` VARCHAR(191) NULL;
