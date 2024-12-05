-- CreateTable
CREATE TABLE "Therapist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Therapist_pkey" PRIMARY KEY ("id")
);
