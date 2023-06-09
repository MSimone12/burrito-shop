/*
  Warnings:

  - You are about to drop the `Optionals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BurritoToOptionals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OptionalIngredientToOptionals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BurritoToOptionals" DROP CONSTRAINT "_BurritoToOptionals_A_fkey";

-- DropForeignKey
ALTER TABLE "_BurritoToOptionals" DROP CONSTRAINT "_BurritoToOptionals_B_fkey";

-- DropForeignKey
ALTER TABLE "_OptionalIngredientToOptionals" DROP CONSTRAINT "_OptionalIngredientToOptionals_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionalIngredientToOptionals" DROP CONSTRAINT "_OptionalIngredientToOptionals_B_fkey";

-- DropTable
DROP TABLE "Optionals";

-- DropTable
DROP TABLE "_BurritoToOptionals";

-- DropTable
DROP TABLE "_OptionalIngredientToOptionals";

-- CreateTable
CREATE TABLE "_BurritoToOptionalIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BurritoToOptionalIngredient_AB_unique" ON "_BurritoToOptionalIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_BurritoToOptionalIngredient_B_index" ON "_BurritoToOptionalIngredient"("B");

-- AddForeignKey
ALTER TABLE "_BurritoToOptionalIngredient" ADD CONSTRAINT "_BurritoToOptionalIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Burrito"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BurritoToOptionalIngredient" ADD CONSTRAINT "_BurritoToOptionalIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "OptionalIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
