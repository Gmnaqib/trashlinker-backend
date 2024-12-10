/*
  Warnings:

  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.
  - Added the required column `image` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `content`,
    DROP COLUMN `published`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `schedule` DATETIME(3) NOT NULL,
    ADD COLUMN `volunteer` JSON NULL,
    MODIFY `title` VARCHAR(191) NULL;
