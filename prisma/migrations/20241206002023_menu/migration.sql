/*
  Warnings:

  - The primary key for the `TherapistsOnMenus` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "TherapistsOnMenus" DROP CONSTRAINT "TherapistsOnMenus_menuId_fkey";

-- DropForeignKey
ALTER TABLE "TherapistsOnMenus" DROP CONSTRAINT "TherapistsOnMenus_therapistId_fkey";

-- AlterTable
ALTER TABLE "TherapistsOnMenus" DROP CONSTRAINT "TherapistsOnMenus_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "therapistId" DROP NOT NULL,
ALTER COLUMN "menuId" DROP NOT NULL,
ALTER COLUMN "treatmentTime" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ADD CONSTRAINT "TherapistsOnMenus_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "TherapistsOnMenus" ADD CONSTRAINT "TherapistsOnMenus_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapistsOnMenus" ADD CONSTRAINT "TherapistsOnMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
