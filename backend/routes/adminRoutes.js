// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// ✅ Admin-only routes
router.get('/bookings/pending', authMiddleware, isAdmin, bookingController.getPendingBookings);
router.put('/bookings/approve/:id', authMiddleware, isAdmin, bookingController.approveBooking);
router.put('/bookings/reject/:id', authMiddleware, isAdmin, bookingController.rejectBooking);

module.exports = router;
