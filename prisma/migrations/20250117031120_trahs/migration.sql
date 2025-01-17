/*
  Warnings:

  - You are about to alter the column `latitude` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `longitud` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `type` ENUM('Volunteer', 'report') NOT NULL DEFAULT 'Volunteer',
    MODIFY `schedule` DATETIME(3) NULL,
    MODIFY `latitude` DOUBLE NOT NULL,
    MODIFY `longitud` DOUBLE NOT NULL;
