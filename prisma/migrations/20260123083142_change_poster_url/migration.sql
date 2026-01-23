/*
  Warnings:

  - You are about to drop the column `pasteUrl` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "pasteUrl",
ADD COLUMN     "posteUrl" TEXT;
