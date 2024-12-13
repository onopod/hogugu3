/*
  Warnings:

  - A unique constraint covering the columns `[therapistId,userId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[therapistId,menuId]` on the table `TherapistsOnMenus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TherapistsOnMenus_therapistId_menuId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_therapistId_userId_key" ON "Favorite"("therapistId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "TherapistsOnMenus_therapistId_menuId_key" ON "TherapistsOnMenus"("therapistId", "menuId");
