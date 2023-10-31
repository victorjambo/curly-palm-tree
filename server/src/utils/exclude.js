/**
 * Exclude items from object
 * <User, Key extends keyof User>
 * @param {{username: string; password: string; id: number}} user
 * @param {string[]} keys
 * @returns {Object}
 */
export function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
