-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "money" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LoginCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "gender" "Gender" NOT NULL,
    "beard" TEXT NOT NULL DEFAULT '',
    "glasses" TEXT NOT NULL DEFAULT '',
    "hair" TEXT NOT NULL DEFAULT '',
    "hands" TEXT NOT NULL DEFAULT 'HANDS_01_1',
    "hat" TEXT NOT NULL DEFAULT '',
    "head" TEXT NOT NULL DEFAULT 'HEAD_01_1',
    "pants" TEXT NOT NULL DEFAULT 'PANTS_01_1',
    "shoes" TEXT NOT NULL DEFAULT 'SHOES_01_1',
    "torso" TEXT NOT NULL DEFAULT 'TORSO_01_1',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnedItem" (
    "id" SERIAL NOT NULL,
    "clothing" JSONB NOT NULL DEFAULT '[]',
    "instrument" JSONB NOT NULL DEFAULT '[]',
    "furniture" JSONB NOT NULL DEFAULT '[]',
    "lastPurchasedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "OwnedItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Character_userId_key" ON "Character"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OwnedItem_ownerId_key" ON "OwnedItem"("ownerId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedItem" ADD CONSTRAINT "OwnedItem_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
