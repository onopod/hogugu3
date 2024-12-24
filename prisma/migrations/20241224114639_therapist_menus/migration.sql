/*
  Warnings:

  - You are about to drop the `therapistMenus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_therapistMenuId_fkey";

-- DropForeignKey
ALTER TABLE "therapistMenus" DROP CONSTRAINT "therapistMenus_menuId_fkey";

-- DropForeignKey
ALTER TABLE "therapistMenus" DROP CONSTRAINT "therapistMenus_therapistId_fkey";

-- DropTable
DROP TABLE "therapistMenus";

-- CreateTable
CREATE TABLE "TherapistsOnMenus" (
    "id" SERIAL NOT NULL,
    "therapistId" INTEGER,
    "menuId" INTEGER,
    "treatmentTime" INTEGER,
    "price" INTEGER,

    CONSTRAINT "TherapistsOnMenus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TherapistsOnMenus_therapistId_menuId_treatmentTime_key" ON "TherapistsOnMenus"("therapistId", "menuId", "treatmentTime");

-- AddForeignKey
ALTER TABLE "TherapistsOnMenus" ADD CONSTRAINT "TherapistsOnMenus_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapistsOnMenus" ADD CONSTRAINT "TherapistsOnMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_therapistMenuId_fkey" FOREIGN KEY ("therapistMenuId") REFERENCES "TherapistsOnMenus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
