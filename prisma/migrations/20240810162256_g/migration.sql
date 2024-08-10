/*
  Warnings:

  - You are about to drop the column `action` on the `Permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "action",
ADD COLUMN     "create" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "delete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "update" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "Action";
