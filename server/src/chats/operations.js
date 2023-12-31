import { getPrismaClient } from "../prisma.js";
import { extractUsername } from "../utils/utils.js";

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

  const chat = await prisma.chat.create({
    data,
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

  let mention = null;
  try {
    if (chat.message.includes("@")) {
      const username = extractUsername(chat.message);
      const user = await prisma.user.findUnique({ where: { username } });
      if (user) {
        mention = {
          to: user.id,
          from: data.userId,
          channel: chat.channel.name,
          message: chat.message,
        };
      }
    }
  } catch (error) {
    // Fail silently
    console.error(error);
  }

  return {
    chat,
    mention,
  };
}

export async function getChatsByChannelId(channelId) {
  /** @type {import('@prisma/client').PrismaClient} */
  const prisma = getPrismaClient();

  const chats = await prisma.chat.findMany({
    where: {
      channelId,
    },
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
