-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rolesId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "rolesId" SET DEFAULT 'a84b4259-2471-43e2-af3a-d4b535de97e2';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
