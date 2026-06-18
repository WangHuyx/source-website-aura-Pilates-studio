/**
 * class.routes.js — dashboard, class catalog, booking, my bookings.
 * Every route here is wrapped with `requireLogin`, so an anonymous
 * visitor gets redirected to /login instead of seeing the page.
 */

const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');
const { requireLogin } = require('../middleware/auth.middleware');

router.get('/dashboard', requireLogin, classController.showDashboard);
router.get('/classes', requireLogin, classController.showClasses);
router.post('/classes/:id/register', requireLogin, classController.registerClass);
router.get('/my-bookings', requireLogin, classController.showMyBookings);

module.exports = router;
