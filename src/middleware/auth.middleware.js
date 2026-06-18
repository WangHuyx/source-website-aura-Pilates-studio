/**
 * auth.middleware.js
 * ------------------------------------------------------------------
 * Route guard: blocks access to protected pages (dashboard, classes,
 * bookings) unless there's a logged-in user in the session.
 * ------------------------------------------------------------------
 */

function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  // Not logged in -> bounce to the login page instead of the page they wanted.
  return res.redirect('/login');
}

module.exports = { requireLogin };
