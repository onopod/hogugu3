-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "prefectureId" INTEGER NOT NULL,
    "country" TEXT,
    "countryKana" TEXT,
    "city" TEXT,
    "cityKana" TEXT,
    "ward" TEXT,
    "wardKana" TEXT,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);
