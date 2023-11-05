/**
 * Accounts Operations
 * @typedef LoginResponse
 * @type {Object}
 * @property {number} id
 * @property {string} username
 * @typedef User
 * @type {Object}
 * @property {number} id
 * @property {string} username
 * @property {string} password
 */

import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { getPrismaClient } from "../prisma.js";
import { exclude } from "../utils/exclude.js";
import { hashedPassword } from "./auth.js";

export async function getAllUsers() {
  /** @type {import('@prisma/client').PrismaClient} */
  const prisma = getPrismaClient();

  return await prisma.user.findMany();
}

/**
 * Create Account.
 * @param {Object} user
 * @param {string} user.username
 * @param {string} user.password
 */
export async function createAccount(user) {
  /** @type {import('@prisma/client').PrismaClient} */
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

/**
 * Login Account.
 * @param {Object} user
 * @param {string} user.username
 * @param {string} user.password
 * @returns {Promise<LoginResponse>}
 */
export const loginAccount = async (user) => {
  /** @type {import('@prisma/client').PrismaClient} */
  const prisma = getPrismaClient();

  const foundUser = await prisma.user.findFirst({
    where: { username: user.username },
  });

  if (!foundUser) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }

  const isMatching = await bcrypt.compare(user.password, foundUser.password);
  if (!isMatching) {
    throw new GraphQLError("Password incorrect", {
      extensions: {
        code: "AUTH_FAILED",
      },
    });
  }

  return exclude(foundUser, ["password"]);
};

/**
 * Get Single user by Id.
 * @param {string} id
 * @returns Get Single user by Id
 */
export async function getUserById(id) {
  /** @type {import('@prisma/client').PrismaClient} */
  const prisma = getPrismaClient();

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }

  return user;
}

export async function loginAs({ id }) {
  /** @type {import('@prisma/client').PrismaClient} */
  const prisma = getPrismaClient();

  const foundUser = await prisma.user.findFirst({
    where: { id },
  });

  if (!foundUser) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }

  return exclude(foundUser, ["password"]);
}
