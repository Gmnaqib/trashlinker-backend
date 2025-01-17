/*
  Warnings:

  - You are about to alter the column `latitude` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `longitude` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `latitude` DOUBLE NULL,
    MODIFY `longitude` DOUBLE NULL;
