import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema.js";
import { createChannel, getChannels } from "./operations.js";
import { withAuth } from "../utils/token.js";

const resolvers = {
  Query: {
    channels: withAuth(getChannels),
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
