-- AlterTable
ALTER TABLE "Therapist" ADD COLUMN     "prefectureId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "prefectureId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Therapist" ADD CONSTRAINT "Therapist_prefectureId_fkey" FOREIGN KEY ("prefectureId") REFERENCES "Prefecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
