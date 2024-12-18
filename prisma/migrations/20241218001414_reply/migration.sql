-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "replyDt" TIMESTAMP(3),
ADD COLUMN     "therapistId" INTEGER;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
