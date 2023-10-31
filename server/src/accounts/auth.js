import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashedPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * @param {number} id
 * @returns {string}
 */
export function generateTokens(id) {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET ?? "token";
  return jwt.sign({ userId: id }, ACCESS_TOKEN, {
    expiresIn: "9000000",
  });
}
