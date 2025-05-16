/*
  Warnings:

  - You are about to drop the column `note` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "note";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "note" TEXT;
