/*
  Warnings:

  - You are about to drop the column `menutemsId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `cartcloneId` on the `ordercart` table. All the data in the column will be lost.
  - You are about to drop the `cartclone` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `all_price` to the `OrderCart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menutemsId` to the `OrderCart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `OrderCart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `OrderCart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `OrderCart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_menutemsId_fkey`;

-- DropForeignKey
ALTER TABLE `cartclone` DROP FOREIGN KEY `Cartclone_menutemsId_fkey`;

-- DropForeignKey
ALTER TABLE `cartclone` DROP FOREIGN KEY `Cartclone_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ordercart` DROP FOREIGN KEY `OrderCart_cartcloneId_fkey`;

-- DropIndex
DROP INDEX `OrderCart_orderId_cartcloneId_idx` ON `ordercart`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `menutemsId`;

-- AlterTable
ALTER TABLE `ordercart` DROP COLUMN `cartcloneId`,
    ADD COLUMN `all_price` INTEGER NOT NULL,
    ADD COLUMN `menutemsId` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `total` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `cartclone`;

-- AddForeignKey
ALTER TABLE `OrderCart` ADD CONSTRAINT `OrderCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderCart` ADD CONSTRAINT `OrderCart_menutemsId_fkey` FOREIGN KEY (`menutemsId`) REFERENCES `Menutems`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `ordercart` RENAME INDEX `ordercart_orderId_idx` TO `OrderCart_orderId_idx`;
