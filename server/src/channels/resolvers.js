import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema.js";
import { createChannel, getChannels, getChannelById } from "./operations.js";
import { withAuth } from "../utils/token.js";

const resolvers = {
  Query: {
    channels: withAuth(getChannels),
    getChannelById: withAuth(async (_parent, args, _context, _info) =>
      getChannelById(args)
    ),
  },
  Mutation: {
    createChannel: withAuth(async (_parent, args, context, _info) => {
      const channel = await createChannel({
        ...args,
        userId: context.userId,
      });

      return {
        channel,
        success: true,
      };
    }),
  },
};

const channelsSchema = {
  schema: makeExecutableSchema({ typeDefs, resolvers }),
};

export default channelsSchema;
