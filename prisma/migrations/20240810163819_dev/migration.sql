/*
  Warnings:

  - You are about to drop the column `create` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `delete` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `update` on the `Permission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "create",
DROP COLUMN "delete",
DROP COLUMN "model",
DROP COLUMN "read",
DROP COLUMN "update";

-- DropEnum
DROP TYPE "Model";

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");
