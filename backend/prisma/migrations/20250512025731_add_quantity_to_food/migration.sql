/*
  Warnings:

  - You are about to drop the column `stock` on the `Food` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "stock",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;
