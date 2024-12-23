/*
  Warnings:

  - Made the column `password` on table `Therapist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Therapist" ALTER COLUMN "password" SET NOT NULL;
