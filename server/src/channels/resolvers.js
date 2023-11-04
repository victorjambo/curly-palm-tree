import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema.js";
import { createChannel, getChannels } from "./operations.js";

const resolvers = {
  Query: {
    channels: getChannels,
  },
  Mutation: {
    createChannel: async (_parent, args, _context, _info) => {
      const channel = await createChannel({
        ...args,
        userId: 1
      });

      return {
        channel,
        success: true,
      };
    }
  }
};

const channelsSchema = { schema: makeExecutableSchema({ typeDefs, resolvers }) };

export default channelsSchema;
