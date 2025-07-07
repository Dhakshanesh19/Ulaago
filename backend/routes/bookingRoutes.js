const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// Only admins can access this
router.get('/pending', authMiddleware, isAdmin, bookingController.getPendingBookings);
router.put('/approve/:id', authMiddleware, isAdmin, bookingController.approveBooking);
router.put('/reject/:id', authMiddleware, isAdmin, bookingController.rejectBooking);

// Normal user routes
router.post('/', authMiddleware, bookingController.createBooking);
router.get('/my', authMiddleware, bookingController.getMyBookings);

module.exports = router;
