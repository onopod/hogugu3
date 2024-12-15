-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "statusId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
