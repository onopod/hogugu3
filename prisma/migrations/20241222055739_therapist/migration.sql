/*
  Warnings:

  - Made the column `mail` on table `Therapist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel` on table `Therapist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Therapist" ADD COLUMN     "password" TEXT,
ALTER COLUMN "mail" SET NOT NULL,
ALTER COLUMN "tel" SET NOT NULL;
