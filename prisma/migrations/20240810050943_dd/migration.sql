/*
  Warnings:

  - The values [REFRESH_TOKEN] on the enum `ModelName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModelName_new" AS ENUM ('USER', 'ACCOUNT', 'PROFILE', 'REFRESHTOKEN', 'ROLE', 'PERMISSION');
ALTER TABLE "Permission" ALTER COLUMN "model" TYPE "ModelName_new" USING ("model"::text::"ModelName_new");
ALTER TYPE "ModelName" RENAME TO "ModelName_old";
ALTER TYPE "ModelName_new" RENAME TO "ModelName";
DROP TYPE "ModelName_old";
COMMIT;
