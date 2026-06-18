/**
 * auth.controller.js
 * ------------------------------------------------------------------
 * CONTROLLER LAYER — translates HTTP requests into service calls and
 * service results into HTTP responses. Controllers stay "thin": no
 * business rules here, just req/res plumbing.
 * ------------------------------------------------------------------
 */

const authService = require('../services/auth.service');

/** GET /login — show the login form (or skip it if already logged in) */
function showLoginForm(req, res) {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login', { title: 'Login', error: null });
}

/** POST /login — validate credentials and start a session */
async function handleLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    if (!result.success) {
      return res.status(401).render('login', { title: 'Login', error: result.message });
    }

    // Storing the (already password-stripped) user on the session
    // is what "remembers" the visitor across requests.
    req.session.user = result.user;
    res.redirect('/dashboard');
  } catch (err) {
    next(err);
  }
}

/** GET /logout — destroy the session and send the visitor back to /login */
function handleLogout(req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect('/login');
  });
}

module.exports = { showLoginForm, handleLogin, handleLogout };
