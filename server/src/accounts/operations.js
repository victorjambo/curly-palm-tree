import { getPrismaClient } from "../prisma.js";
import { exclude } from "../utils/exclude.js";
import { hashedPassword } from "./auth.js";

export async function getAllUsers() {
  const prisma = getPrismaClient();
  return await prisma.user.findMany();
}

/**
 * @param {{username: string; password: string}} user
 * @returns {Promise<{username: string; id: number}>}
 */
export async function createAccount(user) {
  const prisma = getPrismaClient();

  const password = await hashedPassword(user.password);

  const newUser = await prisma.user.create({
    data: {
      ...user,
      password,
    },
  });

  return exclude(newUser, ["password"]);
}

export const getUserById = async (id) => {
  const prisma = getPrismaClient();
  const user = await prisma.user.getUserById(id);
  return user;
};

export const loginAccount = async (user) => {
  const prisma = getPrismaClient();
  const foundUser = await prisma.user.findFirst({
    where: { username: user.username },
  });
  return foundUser;
};
