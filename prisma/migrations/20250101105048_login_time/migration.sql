-- CreateTable
CREATE TABLE "TherapistPasswordResetToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "therapistId" INTEGER NOT NULL,

    CONSTRAINT "TherapistPasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TherapistPasswordResetToken_token_key" ON "TherapistPasswordResetToken"("token");

-- AddForeignKey
ALTER TABLE "TherapistPasswordResetToken" ADD CONSTRAINT "TherapistPasswordResetToken_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
