import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./schema.js";
import {
  getAllUsers,
  createAccount,
  loginAccount,
  loginAs,
} from "./operations.js";
import { generateTokens } from "./auth.js";

const resolvers = {
  Query: {
    users: getAllUsers,
  },
  Mutation: {
    signup: async (_parent, args, _context, _info) => {
      const user = await createAccount(args);

      const accessToken = generateTokens(user.id);

      return {
        user,
        accessToken,
        success: true,
      };
    },
    login: async (_parent, args, _context, _info) => {
      const user = await loginAccount(args);

      const accessToken = generateTokens(user.id);

      return {
        user,
        accessToken,
        success: true,
      };
    },
    loginAs: async (_parent, args, _context, _info) => {
      const user = await loginAs(args);

      const accessToken = generateTokens(user.id);

      return {
        user,
        accessToken,
        success: true,
      };
    },
  },
};

const usersSchema = { schema: makeExecutableSchema({ typeDefs, resolvers }) };

export default usersSchema;
