import jwt from "jsonwebtoken";
import { GraphQLError } from 'graphql';

/**
 * Decode JWT Authorization token from header.
 * @param {string} token
 * @returns {string} userId
 */
export const decodeToken = (authToken) => {
  try {
    const token = authToken.split(" ")[1];
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET ?? "token";

    var decoded = jwt.verify(token, ACCESS_TOKEN);

    return decoded.userId;
  } catch (error) {
    console.warn('Authentication failed for user.', {
      headers: req.headers,
      error
    });
    return 0;
  }
};
