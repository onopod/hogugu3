-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TherapistsOnMenus" (
    "therapistId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "treatmentTime" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "TherapistsOnMenus_pkey" PRIMARY KEY ("therapistId","menuId","treatmentTime")
);

-- AddForeignKey
ALTER TABLE "TherapistsOnMenus" ADD CONSTRAINT "TherapistsOnMenus_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapistsOnMenus" ADD CONSTRAINT "TherapistsOnMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
