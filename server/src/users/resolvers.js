import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from "./schema.js";
import { getAllUsers } from './operations.js';

const resolvers = {
  Query: {
    users: getAllUsers,
  },
};

const usersSchema = { schema: makeExecutableSchema({ typeDefs, resolvers }) };

export default usersSchema;
