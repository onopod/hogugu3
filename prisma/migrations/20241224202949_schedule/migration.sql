-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "therapistId" INTEGER NOT NULL,
    "startDt" TIMESTAMP(3) NOT NULL,
    "endDt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
