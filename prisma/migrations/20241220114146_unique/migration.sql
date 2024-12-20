/*
  Warnings:

  - A unique constraint covering the columns `[therapistId,menuId,treatmentTime]` on the table `TherapistsOnMenus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TherapistsOnMenus_therapistId_menuId_key";

-- CreateIndex
CREATE UNIQUE INDEX "TherapistsOnMenus_therapistId_menuId_treatmentTime_key" ON "TherapistsOnMenus"("therapistId", "menuId", "treatmentTime");
