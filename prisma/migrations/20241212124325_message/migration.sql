/*
  Warnings:

  - Made the column `message` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isUserSend` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isRead` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "message" SET NOT NULL,
ALTER COLUMN "isUserSend" SET NOT NULL,
ALTER COLUMN "isRead" SET NOT NULL;
