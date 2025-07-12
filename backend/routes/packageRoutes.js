const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const Package = require('../models/Package');

// ✅ GET all packages (Public)
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch packages', error: err.message });
  }
});

// ✅ GET package by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ msg: 'Package not found' });
    }
    res.status(200).json(pkg);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch package', error: err.message });
  }
});

// ✅ POST /create (Admin only with image upload)
router.post(
  '/create',
  authMiddleware,
  isAdmin,
  upload.single('coverImage'),
  async (req, res) => {
    try {
      const {
        packageName,
        location,
        duration,
        price,
        description,
        dates,
        vlogLink,
        contactName,
        contactNumber,
        facilities,
      } = req.body;

      const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : '';

      const newPackage = new Package({
        packageName,
        location,
        duration,
        price,
        description,
        dates: dates || '',
        vlogLink: vlogLink || '',
        contactName: contactName || '',
        contactNumber: contactNumber || '',
        facilities: facilities ? JSON.parse(facilities) : {},
        coverImageUrl,
        createdBy: req.user._id,
      });

      await newPackage.save();
      res.status(201).json({ msg: 'Package created successfully', package: newPackage });
    } catch (error) {
      console.error('❌ Failed to create package:', error);
      res.status(500).json({ msg: 'Failed to create package', error: error.message });
    }
  }
);

module.exports = router;
