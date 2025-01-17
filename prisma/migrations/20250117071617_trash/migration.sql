/*
  Warnings:

  - You are about to drop the column `longitud` on the `post` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `longitud`,
    ADD COLUMN `longitude` DOUBLE NOT NULL;
