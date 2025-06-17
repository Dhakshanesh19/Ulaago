const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const upload = require('../middleware/upload'); // Use '../' to go up one directory
// 📦 POST: Create a new package
router.post('/', upload.single('coverImage'), async (req, res) => {
  try {
    const {
      packageName, location, duration, price, description,
      dates, vlogLink, contactName, contactNumber, facilities,
    } = req.body;

    const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newPackage = new Package({
      packageName,
      location,
      duration,
      price,
      description,
      dates,
      vlogLink,
      contactName,
      contactNumber,
      facilities: JSON.parse(facilities), // Parse string to object
      coverImageUrl
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    console.error('❌ Error saving package:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 🌐 GET: Fetch all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    console.error('❌ Error fetching packages:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

