/*
  Warnings:

  - You are about to drop the column `menuId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `therapistId` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `startDt` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `therapistMenuId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_menuId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_therapistId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- DropIndex
DROP INDEX "Reservation_therapistId_userId_menuId_idx";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "menuId",
DROP COLUMN "therapistId",
ADD COLUMN     "startDt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "therapistMenuId" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Reservation_userId_therapistMenuId_idx" ON "Reservation"("userId", "therapistMenuId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_therapistMenuId_fkey" FOREIGN KEY ("therapistMenuId") REFERENCES "TherapistsOnMenus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
