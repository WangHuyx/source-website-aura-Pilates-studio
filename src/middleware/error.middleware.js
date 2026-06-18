/**
 * error.middleware.js
 * ------------------------------------------------------------------
 * Two pieces of "catch-all" middleware, wired up LAST in app.js:
 *  - notFoundHandler: runs when no route matched the request.
 *  - errorHandler: runs when any route/middleware calls next(err)
 *    or throws inside an async function that's properly awaited.
 * ------------------------------------------------------------------
 */

function notFoundHandler(req, res) {
  res.status(404).render('404', { title: 'Page not found' });
}

// Express recognizes this as an error handler because it takes 4 args.
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Something went wrong',
    message: err.message || 'Unexpected server error.',
  });
}

module.exports = { notFoundHandler, errorHandler };
