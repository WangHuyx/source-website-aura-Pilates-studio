# Aura Pilates Studio — booking app starter

A Node.js + Express framework for a Pilates class registration website. Login currently
checks a hardcoded account, but the code is layered so swapping that for a real database
later only touches one folder.

## Demo login

```
username: admin
password: Pilates@123
```

## Run it

```bash
npm install
cp .env.example .env      # optional — defaults work fine for local dev
npm run dev                # nodemon, auto-restarts on file changes
# or: npm start
```

Then open `http://localhost:3000`.

## What it does

- `/login` — sign in against the hardcoded account
- `/dashboard` — landing page after login, quick links + this week's classes
- `/classes` — full class schedule, reserve a spot (respects capacity, blocks double-booking)
- `/my-bookings` — classes the logged-in user has reserved
- `/logout` — clears the session

## Project layout

```
src/
  config/        environment/config values (port, session secret)
  data/           the "fake database" — hardcoded users.data.js & classes.data.js
  repositories/   data access layer — the ONLY files that touch /data
  services/       business logic (login rules, booking rules) — calls repositories
  controllers/    HTTP req/res handling — calls services
  routes/         maps URLs + HTTP verbs to controller functions
  middleware/      requireLogin guard, 404 + error handlers
  views/          EJS templates (server-rendered HTML)
public/css/        stylesheet
```

Each layer only talks to the layer directly below it:

```
routes -> controllers -> services -> repositories -> data
```

## Switching to a real database later

The whole point of the `repositories/` folder is that it's the single seam where
storage is swapped out. Nothing in `controllers/` or `services/` imports `data/`
directly — they only ever call functions like `userRepository.findByUsername(...)`.

To migrate:

1. Pick a database + driver/ORM (e.g. MongoDB + Mongoose, or PostgreSQL + Prisma/knex).
2. Add the connection string to `src/config/config.js` (read from `.env`).
3. Open `src/repositories/user.repository.js` and `src/repositories/class.repository.js`.
   Rewrite the body of each exported function to run a real query instead of reading
   the in-memory array — but keep the function name and the shape of what it returns
   (an object, an array, or `null`). Both files already have commented examples for
   Mongoose and SQL-style queries to start from.
4. Delete `src/data/users.data.js` and `src/data/classes.data.js` once nothing requires
   them anymore.
5. If you move sessions to run across multiple server instances, swap the default
   in-memory session store in `src/app.js` for one backed by your database
   (e.g. `connect-mongo` or `connect-pg-simple`).

Routes, controllers, services, and views stay untouched.

## Notes

- Passwords are hashed with `bcryptjs` even for the hardcoded account, so the
  authentication code is already shaped the way it would look against a real
  database (never comparing plain text passwords).
- The default Express session store is in-memory — fine for local development,
  not for production or multiple server instances (see point 5 above).
