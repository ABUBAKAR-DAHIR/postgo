/*
  Warnings:

  - The `meta_keywords` column on the `post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "meta_keywords",
ADD COLUMN     "meta_keywords" TEXT[];
