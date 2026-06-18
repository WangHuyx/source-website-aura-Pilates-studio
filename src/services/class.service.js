/**
 * class.service.js
 * ------------------------------------------------------------------
 * SERVICE LAYER — business logic for Pilates classes & bookings.
 * Rules such as "don't double-book" or "respect class capacity"
 * live here, not in the controller and not in the repository.
 * ------------------------------------------------------------------
 */

const classRepository = require('../repositories/class.repository');

/** @returns {Promise<object[]>} */
async function listClasses() {
  return classRepository.findAll();
}

/**
 * Register a user for a class, enforcing capacity + no-double-booking.
 * @param {number|string} classId
 * @param {number} userId
 * @returns {Promise<{success: boolean, message: string}>}
 */
async function registerForClass(classId, userId) {
  const targetClass = await classRepository.findById(classId);

  if (!targetClass) {
    return { success: false, message: 'That class could not be found.' };
  }

  if (targetClass.enrolledUserIds.includes(userId)) {
    return { success: false, message: `You're already booked into ${targetClass.name}.` };
  }

  if (targetClass.enrolledUserIds.length >= targetClass.capacity) {
    return { success: false, message: `${targetClass.name} is fully booked.` };
  }

  await classRepository.addUserToClass(classId, userId);
  return { success: true, message: `You're booked into ${targetClass.name}.` };
}

/**
 * @param {number} userId
 * @returns {Promise<object[]>} classes a user has booked
 */
async function myClasses(userId) {
  return classRepository.findClassesByUserId(userId);
}

module.exports = { listClasses, registerForClass, myClasses };
