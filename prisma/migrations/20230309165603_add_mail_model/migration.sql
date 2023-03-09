/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - Added the required column `date_of_birth` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitch` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    ADD COLUMN `date_of_birth` DATETIME NOT NULL,
    ADD COLUMN `mail` VARCHAR(50) NOT NULL,
    ADD COLUMN `twitch` VARCHAR(50) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE `mail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `from` VARCHAR(50) NOT NULL,
    `to` VARCHAR(50) NOT NULL,
    `subject` VARCHAR(50) NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `info` VARCHAR(255) NULL,
    `error` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
