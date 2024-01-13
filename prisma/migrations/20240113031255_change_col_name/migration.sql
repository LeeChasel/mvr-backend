/*
  Warnings:

  - You are about to drop the column `LoginCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "LoginCount",
ADD COLUMN     "loginCount" INTEGER NOT NULL DEFAULT 0;
