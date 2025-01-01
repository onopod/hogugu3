/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `Therapist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Therapist_mail_key" ON "Therapist"("mail");
