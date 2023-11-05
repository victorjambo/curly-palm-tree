import { decodeToken } from "../utils/token.js";

export const context = async ({ req }) => {
  const authorization = req?.headers?.authorization || "";
  let userId;
  let isAuthenticated = false;
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    userId = decodeToken(token);
    if (userId) isAuthenticated = true;
  }

  return { isAuthenticated, userId };
};
