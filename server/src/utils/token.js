import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { getUserById } from "../accounts/operations.js";

/**
 * Decode JWT Authorization token from header.
 * @param {string} token
 * @returns {string} userId
 */
export const decodeToken = (token) => {
  try {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET ?? "token";

    var decoded = jwt.verify(token, ACCESS_TOKEN);

    return decoded.userId;
  } catch (error) {
    console.warn("Authentication failed for user.", {
      error,
    });
    return 0;
  }
};

export function withAuth(resolver) {
  return async function (root, args, context, info) {
    const user = await getUserById(context.userId);
    if (!user) {
      throw new GraphQLError("Authentication failed for user.", {
        extensions: {
          code: "AUTHENTICATION_FAIL",
        },
      });
    }
    return resolver(root, args, context, info);
  };
}
