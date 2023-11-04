import { getUserById } from "../accounts/operations.js";
import { decodeToken } from "../utils/token.js";

export const context = async ({ req }) => {
  const token = req.headers.authorization || '';

  const userId = decodeToken(token);

  return await getUserById(userId);
}
