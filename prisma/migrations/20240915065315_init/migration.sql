/*
  Warnings:

  - You are about to drop the column `name` on the `delivery` table. All the data in the column will be lost.
  - Added the required column `imgpay` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Menutems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` DROP COLUMN `name`,
    ADD COLUMN `imgpay` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `menutems` ADD COLUMN `status` INTEGER NOT NULL;
