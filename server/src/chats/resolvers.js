import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema.js";
import { getChats, createChat, getChatsByChannelId } from "./operations.js";
import { withAuth } from "../utils/token.js";

const resolvers = {
  Query: {
    chats: withAuth(getChats),
    getChatsByChannelId: withAuth(async (_parent, args, _context, _info) => {
      return getChatsByChannelId(args.channelId);
    }),
  },
  Mutation: {
    createChat: withAuth(async (_parent, args, context, _info) => {
      const chat = await createChat({
        ...args,
        userId: context.userId,
      });

      return {
        chat,
        success: true,
      };
    }),
  },
};

const chatsSchema = { schema: makeExecutableSchema({ typeDefs, resolvers }) };

export default chatsSchema;
