import { getPrismaClient } from "../prisma.js";

export async function getAllUsers() {
  const prisma = getPrismaClient();
  return await prisma.user.findMany();
}
