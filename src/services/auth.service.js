/**
 * auth.service.js
 * ------------------------------------------------------------------
 * SERVICE LAYER — business logic for authentication.
 *
 * Controllers call this, this calls the repository. The service
 * layer is where rules live (e.g. "passwords must match the hash",
 * "never leak the password hash back up"). It does NOT know or care
 * whether the data underneath is an in-memory array or a real DB —
 * that's the repository's job.
 * ------------------------------------------------------------------
 */

const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');

/**
 * Attempt to log a user in.
 * @param {string} username
 * @param {string} plainPassword
 * @returns {Promise<{success: boolean, user?: object, message?: string}>}
 */
async function login(username, plainPassword) {
  if (!username || !plainPassword) {
    return { success: false, message: 'Please enter both username and password.' };
  }

  const user = await userRepository.findByUsername(username);
  if (!user) {
    // Same generic message as a wrong password, on purpose —
    // this avoids revealing whether the username exists.
    return { success: false, message: 'Invalid username or password.' };
  }

  const passwordMatches = bcrypt.compareSync(plainPassword, user.passwordHash);
  if (!passwordMatches) {
    return { success: false, message: 'Invalid username or password.' };
  }

  // Strip the password hash before this user object travels any
  // further (into the session, into a view, etc).
  const { passwordHash, ...safeUser } = user;
  return { success: true, user: safeUser };
}

module.exports = { login };
