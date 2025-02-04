/*
  Warnings:

  - Added the required column `fullAddress` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `fullAddress` VARCHAR(191) NOT NULL;
