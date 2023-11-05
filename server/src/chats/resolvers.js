import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema.js";
import { getChats, createChat, getChatsByChannelId } from "./operations.js";
import { withAuth } from "../utils/token.js";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

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

      pubsub.publish("POST_CREATED", { postCreated: chat });

      return {
        chat,
        success: true,
      };
    }),
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    },
  },
};

const chatsSchema = { schema: makeExecutableSchema({ typeDefs, resolvers }) };

export default chatsSchema;
