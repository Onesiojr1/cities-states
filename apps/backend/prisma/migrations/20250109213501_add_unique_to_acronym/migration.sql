/*
  Warnings:

  - A unique constraint covering the columns `[acronym]` on the table `State` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "State_acronym_key" ON "State"("acronym");
