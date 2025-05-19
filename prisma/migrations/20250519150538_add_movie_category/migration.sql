/*
  Warnings:

  - You are about to drop the `movieCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "movieCategories" DROP CONSTRAINT "movieCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "movieCategories" DROP CONSTRAINT "movieCategories_movieId_fkey";

-- DropTable
DROP TABLE "movieCategories";

-- CreateTable
CREATE TABLE "movieCategory" (
    "id" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "movieCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "movieCategory" ADD CONSTRAINT "movieCategory_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movieCategory" ADD CONSTRAINT "movieCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
