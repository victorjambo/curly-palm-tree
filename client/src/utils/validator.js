/**
 * Validate Auth Form.
 * @param {string} username
 * @param {string} password
 * @param {string} confirmPassword
 * @typedef Errors
 * @type {Object}
 * @property {string} email
 * @property {string} name
 * @property {string} password
 * @property {string} confirmPassword
 * @returns {{ isValid: boolean, errors: Errors[] }}
 */
export const validateAuth = (username, password, confirmPassword) => {
  const errors = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  let isValid = true;

  const nameRegex = /^[a-zA-Z0-9_]{4,}$/; // Matches alphanumeric characters and underscore, with minimum length 4
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/; // Matches strong password: 6-20 characters with at least one uppercase, one lowercase, one digit, and one special character

  if (!nameRegex.test(username)) {
    errors.username = "must contain at least 4 characters";
    isValid = false;
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character";
    isValid = false;
  }

  return { isValid, errors };
};
