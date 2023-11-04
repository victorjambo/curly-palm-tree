/**
 * Exclude items from user object
 * @param {Object} user
 * @param {number} user.id
 * @param {string} user.username
 * @param {string} user.password
 * @param {keyof User} keys
 */
export function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
