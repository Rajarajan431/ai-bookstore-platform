-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('PENDING', 'SHIPPED');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "status" "OrderItemStatus" NOT NULL DEFAULT 'PENDING';
