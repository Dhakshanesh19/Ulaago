const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const upload = require('../middleware/uploadMiddleware'); // importing the multer instance

// 🟢 Define upload middleware with required fields
const uploadFields = upload.fields([
  { name: 'idProof', maxCount: 1 },
  { name: 'personalPhoto', maxCount: 1 },
]);
router.post('/', authMiddleware, uploadFields, bookingController.createBooking);


// ===========================
// Normal user routes
// ===========================

// Create a new booking (with uploads)

// Get bookings for logged-in user
router.get('/my', authMiddleware, bookingController.getMyBookings);

// ===========================
// Admin-only routes
// ===========================

router.get('/pending', authMiddleware, isAdmin, bookingController.getPendingBookings);
router.put('/approve/:id', authMiddleware, isAdmin, bookingController.approveBooking);
router.put('/reject/:id', authMiddleware, isAdmin, bookingController.rejectBooking);
router.put('/complete/:id', authMiddleware, isAdmin, bookingController.markCompleted);
router.get('/history', authMiddleware, isAdmin, bookingController.getAllHistory);
router.get('/approved-active', authMiddleware, isAdmin, bookingController.getApprovedUncompleted);
router.get('/completed-count', authMiddleware, isAdmin, bookingController.getCompletedCount);

module.exports = router;
