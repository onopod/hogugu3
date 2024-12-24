/*
  Warnings:

  - You are about to drop the `TherapistsOnMenus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_therapistMenuId_fkey";

-- DropForeignKey
ALTER TABLE "TherapistsOnMenus" DROP CONSTRAINT "TherapistsOnMenus_menuId_fkey";

-- DropForeignKey
ALTER TABLE "TherapistsOnMenus" DROP CONSTRAINT "TherapistsOnMenus_therapistId_fkey";

-- DropTable
DROP TABLE "TherapistsOnMenus";

-- CreateTable
CREATE TABLE "therapistMenus" (
    "id" SERIAL NOT NULL,
    "therapistId" INTEGER,
    "menuId" INTEGER,
    "treatmentTime" INTEGER,
    "price" INTEGER,

    CONSTRAINT "therapistMenus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "therapistMenus_therapistId_menuId_treatmentTime_key" ON "therapistMenus"("therapistId", "menuId", "treatmentTime");

-- AddForeignKey
ALTER TABLE "therapistMenus" ADD CONSTRAINT "therapistMenus_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "therapistMenus" ADD CONSTRAINT "therapistMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_therapistMenuId_fkey" FOREIGN KEY ("therapistMenuId") REFERENCES "therapistMenus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
