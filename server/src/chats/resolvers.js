import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema.js";
import { getChats, createChat, getChatsByChannelId } from "./operations.js";

const resolvers = {
  Query: {
    chats: getChats,
    getChatsByChannelId: async (_parent, args, _context, _info) => {
      return getChatsByChannelId(args.channelId);
    },
  },
  Mutation: {
    createChat: async (_parent, args, _context, _info) => {
      const chat = await createChat({
        ...args,
        userId: 1,
      });

      return {
        chat,
        success: true,
      };
    },
  },
};

const chatsSchema = { schema: makeExecutableSchema({ typeDefs, resolvers }) };

export default chatsSchema;
