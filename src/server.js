/**
 * server.js
 * ------------------------------------------------------------------
 * Entry point. Run with `npm start` (or `npm run dev` for
 * auto-restart via nodemon).
 * ------------------------------------------------------------------
 */

const app = require('./app');
const config = require('./config/config');

app.listen(config.port, () => {
  console.log(`Aura Pilates Studio app running at http://localhost:${config.port}`);
  console.log('Demo login -> username: admin | password: Pilates@123');
});
