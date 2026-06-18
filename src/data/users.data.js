/**
 * users.data.js
 * ------------------------------------------------------------------
 * TEMPORARY DATA SOURCE — plays the role of the "users" table you'd
 * normally have in a real database (MongoDB, MySQL, PostgreSQL...).
 *
 * Nothing outside the repository layer should import this file
 * directly (see ../repositories/user.repository.js). That's the
 * whole trick that makes switching to a real database painless:
 *
 *     controllers  -->  services  -->  repositories  -->  (data source)
 *                                          ^
 *                            only this layer changes later
 *
 * The password is hashed with bcrypt at startup, exactly like it
 * would be in a real "users" table — the rest of the app never
 * sees the plain text password, only the hash.
 * ------------------------------------------------------------------
 */

const bcrypt = require('bcryptjs');

// Demo credentials for this hardcoded version of the app.
// username: admin | password: Pilates@123
const DEMO_PASSWORD_PLAIN = 'Pilates@123';

const users = [
  {
    id: 1,
    username: 'admin',
    // In a real DB this column would already store the hash —
    // we hash it here once, on startup, to mimic that.
    passwordHash: bcrypt.hashSync(DEMO_PASSWORD_PLAIN, 10),
    fullName: 'Huy Nguyen',
    email: 'admin@aurapilates.test',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
];

module.exports = users;
