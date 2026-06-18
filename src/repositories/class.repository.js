/**
 * class.repository.js
 * ------------------------------------------------------------------
 * REPOSITORY LAYER (data access layer) for Pilates classes and
 * bookings. Same idea as user.repository.js: this file is the only
 * one allowed to know where class data physically lives.
 *
 * 🔁 WHEN YOU ADD A REAL DATABASE
 * ------------------------------------------------------------------
 * `enrolledUserIds` (an array on each class) is a quick stand-in for
 * what would normally be its own "bookings" table, e.g.:
 *
 *    bookings: { id, class_id, user_id, booked_at }
 *
 * You'd then rewrite addUserToClass()/findClassesByUserId() as
 * INSERT/SELECT queries against that table (or Mongoose calls)
 * instead of mutating the in-memory array, but the function
 * signatures below would stay the same.
 * ------------------------------------------------------------------
 */

const classes = require('../data/classes.data');

/** @returns {Promise<object[]>} every class */
async function findAll() {
  return classes;
}

/**
 * @param {number|string} id
 * @returns {Promise<object|null>}
 */
async function findById(id) {
  const match = classes.find((c) => c.id === Number(id));
  return match || null;
}

/**
 * Adds a user id to a class's enrolled list (idempotent).
 * @param {number|string} classId
 * @param {number} userId
 * @returns {Promise<object|null>} the updated class, or null if not found
 */
async function addUserToClass(classId, userId) {
  const targetClass = classes.find((c) => c.id === Number(classId));
  if (!targetClass) return null;

  if (!targetClass.enrolledUserIds.includes(userId)) {
    targetClass.enrolledUserIds.push(userId);
  }
  return targetClass;
}

/**
 * @param {number} userId
 * @returns {Promise<object[]>} classes the given user is enrolled in
 */
async function findClassesByUserId(userId) {
  return classes.filter((c) => c.enrolledUserIds.includes(userId));
}

module.exports = {
  findAll,
  findById,
  addUserToClass,
  findClassesByUserId,
};
