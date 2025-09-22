/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropTable
DROP TABLE "public"."Order";

-- DropTable
DROP TABLE "public"."OrderItem";

-- DropEnum
DROP TYPE "public"."OrderStatus";

-- CreateTable
CREATE TABLE "public"."PackagePlan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "speed" TEXT NOT NULL,
    "gradient" TEXT NOT NULL DEFAULT 'from-primary via-primary-dark to-primary',
    "features" JSONB NOT NULL,
    "popularFeatures" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackagePlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PackagePlan_slug_key" ON "public"."PackagePlan"("slug");
