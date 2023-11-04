import { getPrismaClient } from "../prisma.js";

export async function getChats() {
  /** @type {import('@prisma/client').PrismaClient} */
  const prisma = getPrismaClient();

  const chats = await prisma.chat.findMany({
    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      channel: {
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      },
    },
  });
  return chats;
}

/**
 * Create Chat
 * @param {Object} chat
 * @param {string} chat.message
 * @param {number} chat.userId
 * @param {number} chat.channelId
 * @returns {chat}
 */
export async function createChat(data) {
  /** @type {import('@prisma/client').PrismaClient} */
  const prisma = getPrismaClient();

  return await prisma.chat.create({
    data: chat,
  });
}
