/*
  Warnings:

  - You are about to drop the column `secondarNumber` on the `Company` table. All the data in the column will be lost.
  - Added the required column `secondaryNumber` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "secondarNumber",
ADD COLUMN     "secondaryNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
