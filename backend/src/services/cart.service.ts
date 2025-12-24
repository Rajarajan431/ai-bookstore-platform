import prisma from "../lib/prisma";

/**
 * Get active cart (PENDING order)
 */
export async function getCartByBuyerId(buyerId: number) {
  return prisma.order.findFirst({
    where: {
      buyerId,
      status: "PENDING",
    },
    include: {
      items: {
        include: {
          book: {
            select: {
              id: true,
              title: true,
              imageUrl: true,
              price: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Add book to cart
 */
export async function addBookToCart(buyerId: number, bookId: number) {
  let cart = await getOrCreateCart(buyerId);

  if (!cart) {
    cart = await prisma.order.create({
      data: {
        buyerId,
        total: 0,
      },
    });

    const orderId = cart?.id;
  }

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) throw new Error("Book not found");

  const existingItem = await prisma.orderItem.findFirst({
    where: {
      orderId: cart.id,
      bookId,
    },
  });

  if (existingItem) {
    await prisma.orderItem.update({
      where: { id: existingItem.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.orderItem.create({
      data: {
        orderId: cart.id,
        bookId,
        sellerId: book.sellerId,
        price: book.price,
        quantity: 1,
      },
    });
  }

  return recalculateCart(cart.id);
}

//helper function
async function getOrCreateCart(buyerId: number) {
  const existingCart = await getCartByBuyerId(buyerId);

  if (existingCart) return existingCart;

  return prisma.order.create({
    data: {
      buyerId,
      total: 0,
    },
  });
}


/**
 * Remove item from cart
 */
export async function removeItemFromCart(itemId: number, buyerId: number) {
  await prisma.orderItem.delete({
    where: { id: itemId },
  });

  const cart = await getCartByBuyerId(buyerId);
  if (!cart) return null;

  return recalculateCart(cart.id);
}

/**
 * Recalculate cart total
 */
async function recalculateCart(orderId: number) {
  const items = await prisma.orderItem.findMany({
    where: { orderId },
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await prisma.order.update({
    where: { id: orderId },
    data: { total },
  });

  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          book: {
            select: {
              id: true,
              title: true,
              imageUrl: true,
              price: true,
            },
          },
        },
      },
    },
  });
}


