/*
  Warnings:

  - You are about to drop the column `postId` on the `volunteer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `volunteer` DROP FOREIGN KEY `volunteer_postId_fkey`;

-- DropIndex
DROP INDEX `volunteer_postId_fkey` ON `volunteer`;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('USER', 'COMMUNITY', 'ADMIN') NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE `volunteer` DROP COLUMN `postId`;

-- CreateTable
CREATE TABLE `postVolunteer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `volunteerId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `postVolunteer` ADD CONSTRAINT `postVolunteer_volunteerId_fkey` FOREIGN KEY (`volunteerId`) REFERENCES `volunteer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postVolunteer` ADD CONSTRAINT `postVolunteer_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
