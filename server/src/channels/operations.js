import { getPrismaClient } from "../prisma.js";

export async function getChannels() {
  /** @type {import('@prisma/client').PrismaClient} */
  const prisma = getPrismaClient();

  return await prisma.channel.findMany({
    include: {
      chats: {
        select: {
          id: true,
          message: true,
          user: true,
          createdAt: true
        },
      },
    },
  });
}

/**
 * Create Channel
 * @param {Object} channel
 * @param {string} channel.name
 * @param {number} channel.userId
 * @returns {channel}
 */
export async function createChannel(channel) {
  /** @type {import('@prisma/client').PrismaClient} */
  const prisma = getPrismaClient();

  return await prisma.channel.create({
    data: channel,
  });
}
