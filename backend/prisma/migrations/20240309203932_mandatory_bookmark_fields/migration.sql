/*
  Warnings:

  - A unique constraint covering the columns `[userId,characterId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Bookmark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `characterId` on table `Bookmark` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "characterId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_characterId_key" ON "Bookmark"("userId", "characterId");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
