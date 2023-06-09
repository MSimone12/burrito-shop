-- CreateTable
CREATE TABLE "_OptionalIngredientToOrderItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionalIngredientToOrderItem_AB_unique" ON "_OptionalIngredientToOrderItem"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionalIngredientToOrderItem_B_index" ON "_OptionalIngredientToOrderItem"("B");

-- AddForeignKey
ALTER TABLE "_OptionalIngredientToOrderItem" ADD CONSTRAINT "_OptionalIngredientToOrderItem_A_fkey" FOREIGN KEY ("A") REFERENCES "OptionalIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionalIngredientToOrderItem" ADD CONSTRAINT "_OptionalIngredientToOrderItem_B_fkey" FOREIGN KEY ("B") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
