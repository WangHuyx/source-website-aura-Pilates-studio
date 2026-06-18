/**
 * config.js
 * ------------------------------------------------------------------
 * Single place where every "environment-dependent" value lives.
 * Controllers/services never read process.env directly — they read
 * from this file instead, so all configuration stays in one spot.
 *
 * When you add a real database, its connection string will also
 * be read here, e.g.:
 *   dbUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/pilates'
 * ------------------------------------------------------------------
 */

// Loads variables from a local ".env" file (if present) into process.env.
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'dev_secret_change_me',
};
