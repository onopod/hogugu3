-- CreateTable
CREATE TABLE "Prefecture" (
    "id" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "kana" TEXT NOT NULL,

    CONSTRAINT "Prefecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "kana" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prefecture" ADD CONSTRAINT "Prefecture_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
