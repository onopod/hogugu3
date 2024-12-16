/*
  Warnings:

  - You are about to drop the column `isUserSend` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "isUserSend",
ADD COLUMN     "messageStatusId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "MessageStatus" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MessageStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_messageStatusId_fkey" FOREIGN KEY ("messageStatusId") REFERENCES "MessageStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
