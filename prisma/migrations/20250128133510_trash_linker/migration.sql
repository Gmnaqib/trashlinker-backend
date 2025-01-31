/*
  Warnings:

  - The values [ADMIN] on the enum `user_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `logvolunteer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `logvolunteer` DROP FOREIGN KEY `logVolunteer_postId_fkey`;

-- DropForeignKey
ALTER TABLE `logvolunteer` DROP FOREIGN KEY `logVolunteer_userId_fkey`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('USER', 'COMMUNITY') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `logvolunteer`;
