-- CreateTable
CREATE TABLE "Burrito" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Burrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BurritoVariation" (
    "id" SERIAL NOT NULL,
    "burritoId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "BurritoVariation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Optionals" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Optionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionalIngredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "OptionalIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "burritoId" INTEGER NOT NULL,
    "variationId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BurritoToIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BurritoToOptionals" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OptionalIngredientToOptionals" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BurritoToIngredients_AB_unique" ON "_BurritoToIngredients"("A", "B");

-- CreateIndex
CREATE INDEX "_BurritoToIngredients_B_index" ON "_BurritoToIngredients"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BurritoToOptionals_AB_unique" ON "_BurritoToOptionals"("A", "B");

-- CreateIndex
CREATE INDEX "_BurritoToOptionals_B_index" ON "_BurritoToOptionals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OptionalIngredientToOptionals_AB_unique" ON "_OptionalIngredientToOptionals"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionalIngredientToOptionals_B_index" ON "_OptionalIngredientToOptionals"("B");

-- AddForeignKey
ALTER TABLE "BurritoVariation" ADD CONSTRAINT "BurritoVariation_burritoId_fkey" FOREIGN KEY ("burritoId") REFERENCES "Burrito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_burritoId_fkey" FOREIGN KEY ("burritoId") REFERENCES "Burrito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "BurritoVariation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BurritoToIngredients" ADD CONSTRAINT "_BurritoToIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Burrito"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BurritoToIngredients" ADD CONSTRAINT "_BurritoToIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BurritoToOptionals" ADD CONSTRAINT "_BurritoToOptionals_A_fkey" FOREIGN KEY ("A") REFERENCES "Burrito"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BurritoToOptionals" ADD CONSTRAINT "_BurritoToOptionals_B_fkey" FOREIGN KEY ("B") REFERENCES "Optionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionalIngredientToOptionals" ADD CONSTRAINT "_OptionalIngredientToOptionals_A_fkey" FOREIGN KEY ("A") REFERENCES "OptionalIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionalIngredientToOptionals" ADD CONSTRAINT "_OptionalIngredientToOptionals_B_fkey" FOREIGN KEY ("B") REFERENCES "Optionals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
