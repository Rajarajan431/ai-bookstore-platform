import prisma from "../lib/prisma";

export const getUserById = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const updateUser = async (
  userId: number,
  data: { name?: string; email?: string }
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const changePassword = async (
  userId: number,
  hashedPassword: string
) => {
  return prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
};
