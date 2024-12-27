/*
  Warnings:

  - You are about to drop the column `city` on the `Therapist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Therapist" DROP COLUMN "city",
ADD COLUMN     "cityId" TEXT;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Therapist" ADD CONSTRAINT "Therapist_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
