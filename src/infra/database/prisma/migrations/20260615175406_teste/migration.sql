/*
  Warnings:

  - You are about to drop the column `createAt` on the `pdf` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pdf" DROP COLUMN "createAt",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
