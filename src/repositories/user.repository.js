/**
 * user.repository.js
 * ------------------------------------------------------------------
 * REPOSITORY LAYER (data access layer) for users.
 *
 * This is the ONLY file in the whole project that is allowed to know
 * WHERE user data physically lives. Right now that's an in-memory
 * array (users.data.js). Later it might be MongoDB, MySQL, etc.
 *
 * 🔁 HOW TO SWITCH TO A REAL DATABASE LATER
 * ------------------------------------------------------------------
 * 1. Keep the exact function names exported below (findByUsername,
 *    findById) and keep them returning a Promise that resolves to
 *    either a user object or null — that "contract" is what the
 *    service layer relies on.
 * 2. Replace the body of each function with a real query. Examples:
 *
 *    // MongoDB / Mongoose
 *    const UserModel = require('../models/user.model');
 *    async function findByUsername(username) {
 *      return UserModel.findOne({ username }).lean();
 *    }
 *
 *    // PostgreSQL / MySQL with knex
 *    async function findByUsername(username) {
 *      return db('users').where({ username }).first();
 *    }
 *
 * 3. Delete the `require('../data/users.data')` line and the
 *    users.data.js file — nothing else in the project imports it
 *    directly, so nothing else needs to change.
 * ------------------------------------------------------------------
 */

const users = require('../data/users.data');

/**
 * Find a single user by username (case-insensitive).
 * @param {string} username
 * @returns {Promise<object|null>}
 */
async function findByUsername(username) {
  const match = users.find(
    (u) => u.username.toLowerCase() === String(username || '').toLowerCase()
  );
  return match || null;
}

/**
 * Find a single user by numeric id.
 * @param {number|string} id
 * @returns {Promise<object|null>}
 */
async function findById(id) {
  const match = users.find((u) => u.id === Number(id));
  return match || null;
}

module.exports = {
  findByUsername,
  findById,
};
