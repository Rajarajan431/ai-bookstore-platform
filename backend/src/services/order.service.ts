import prisma from "../lib/prisma";

export async function createOrder(
  buyerId: number,
  items: { bookId: number; quantity: number }[]
) {
  return prisma.$transaction(async (tx) => {
    let total = 0;

    const orderItemsData = [];

    for (const item of items) {
      const book = await tx.book.findUnique({
        where: { id: item.bookId }
      });

      if (!book) throw new Error("Book not found");
      if (book.stock < item.quantity) throw new Error("Out of stock");
      if (book.sellerId === buyerId) {
        throw new Error("Cannot purchase your own book");
      }

      total += book.price * item.quantity;

      orderItemsData.push({
        bookId: book.id,
        sellerId: book.sellerId,
        quantity: item.quantity,
        price: book.price
      });

      await tx.book.update({
        where: { id: book.id },
        data: { stock: { decrement: item.quantity } }
      });
    }

    return tx.order.create({
      data: {
        buyerId,
        total,
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: true
      }
    });
  });
}

export async function getBuyerOrders(buyerId: number) {
  return prisma.order.findMany({
    where: { buyerId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          book: {
            select: {
              id: true,
              title: true,
              imageUrl: true
            }
          }
        }
      }
    }
  });
}

export async function getSellerOrders(sellerId: number) {
  return prisma.orderItem.findMany({
    where: { sellerId },
    orderBy: { createdAt: "desc" },
    include: {
      book: {
        select: {
          id: true,
          title: true
        }
      },
      order: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          buyer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }
    }
  });
}
