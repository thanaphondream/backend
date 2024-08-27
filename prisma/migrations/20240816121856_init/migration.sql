/*
  Warnings:

  - Added the required column `menutemsId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `menutemsId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_menutemsId_fkey` FOREIGN KEY (`menutemsId`) REFERENCES `Menutems`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
