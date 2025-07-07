const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Existing routes here...
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/me', authMiddleware, authController.getCurrentUser);

// ✅ Add this debug test route:
router.get('/test-auth', authMiddleware, (req, res) => {
  res.json({ msg: '✅ You are authenticated!', user: req.user });
});

module.exports = router;
