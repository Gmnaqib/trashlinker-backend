/*
  Warnings:

  - You are about to drop the column `checkin` on the `volunteer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `postvolunteer` ADD COLUMN `checkin` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `volunteer` DROP COLUMN `checkin`;
