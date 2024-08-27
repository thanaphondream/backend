/*
  Warnings:

  - You are about to drop the column `all_price` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `all_price` on the `ordercart` table. All the data in the column will be lost.
  - You are about to drop the column `menutemsId` on the `ordercart` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ordercart` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `ordercart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ordercart` table. All the data in the column will be lost.
  - Added the required column `allprice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_all` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartcloneId` to the `OrderCart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_menutemsId_fkey`;

-- DropForeignKey
ALTER TABLE `ordercart` DROP FOREIGN KEY `ordercart_menutemsId_fkey`;

-- DropForeignKey
ALTER TABLE `ordercart` DROP FOREIGN KEY `ordercart_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `ordercart` DROP FOREIGN KEY `ordercart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `Reviews_menutemsId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `all_price`,
    DROP COLUMN `total`,
    ADD COLUMN `allprice` INTEGER NOT NULL,
    ADD COLUMN `total_all` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ordercart` DROP COLUMN `all_price`,
    DROP COLUMN `menutemsId`,
    DROP COLUMN `status`,
    DROP COLUMN `total`,
    DROP COLUMN `userId`,
    ADD COLUMN `cartcloneId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Cartclone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL,
    `all_price` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `menutemsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `OrderCart_orderId_cartcloneId_idx` ON `OrderCart`(`orderId`, `cartcloneId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_menutemsId_fkey` FOREIGN KEY (`menutemsId`) REFERENCES `Menutems`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_menutemsId_fkey` FOREIGN KEY (`menutemsId`) REFERENCES `Menutems`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cartclone` ADD CONSTRAINT `Cartclone_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cartclone` ADD CONSTRAINT `Cartclone_menutemsId_fkey` FOREIGN KEY (`menutemsId`) REFERENCES `Menutems`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderCart` ADD CONSTRAINT `OrderCart_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderCart` ADD CONSTRAINT `OrderCart_cartcloneId_fkey` FOREIGN KEY (`cartcloneId`) REFERENCES `Cartclone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
