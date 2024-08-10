/*
  Warnings:

  - Changed the type of `model` on the `Permission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Model" AS ENUM ('USER', 'ACCOUNT', 'PROFILE', 'REFRESHTOKEN', 'ROLE', 'PERMISSION');

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "model",
ADD COLUMN     "model" "Model" NOT NULL;

-- DropEnum
DROP TYPE "ModelName";
