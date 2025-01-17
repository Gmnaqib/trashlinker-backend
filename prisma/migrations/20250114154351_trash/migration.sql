/*
  Warnings:

  - You are about to drop the column `location` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `volunteer` on the `post` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitud` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitud` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `location`,
    DROP COLUMN `volunteer`,
    ADD COLUMN `latitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `longitud` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `latitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `longitud` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `volunteer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `volunteer` ADD CONSTRAINT `volunteer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `volunteer` ADD CONSTRAINT `volunteer_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
