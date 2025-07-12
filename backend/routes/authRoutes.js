const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // multer instance

// 🧍 User Signup (no file upload)
router.post('/signup', authController.signup);

// 👮 Admin Signup (requires file upload: idProof)
router.post('/admin/signup', upload.single('idProof'), authController.signup);

// 🔐 Login (shared endpoint, role will be validated inside controller)
router.post('/login', authController.login);

// 🚪 Logout
router.post('/logout', authController.logout);

// ✅ Get logged-in user info
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
