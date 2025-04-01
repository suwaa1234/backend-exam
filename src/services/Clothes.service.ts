import prisma from "../database";

export const listClothes = async () => {
  return prisma.clothes.findMany();
};

export const getSellerById = async (id: number) => {
  return prisma.users.findUnique({
    where: { id },
    select: { id: true, role: true }
  });
};

export const createClothes = async (data: {
  name: string;
  description?: string;
  price: number;
  size: string;
  sellerId: number;
}) => {
  return prisma.clothes.create({
    data: {
      ...data,
      price: typeof data.price === 'string' ? parseFloat(data.price) : data.price
    }
  });
};

export const getProductById = async (id: number) => {
  return prisma.clothes.findUnique({
    where: { id },
    include: { seller: true }
  });
};

export const updateClothes = async (id: number, data: {
  name?: string;
  description?: string;
  price?: number;
  size?: string;
}) => {
  return prisma.clothes.update({
    where: { id },
    data: {
      ...data,
      price: data.price ? (typeof data.price === 'string' ? parseFloat(data.price) : data.price) : undefined
    }
  });
};

export const deleteClothes = async (id: number) => {
  return prisma.clothes.delete({
    where: { id }
  });
};