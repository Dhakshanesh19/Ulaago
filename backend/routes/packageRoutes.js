const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // path to your multer config
const Package = require('../models/package');

// Create a new package with an image
router.post('/create', upload.single('coverImage'), async (req, res) => {
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
      dates,
      vlogLink,
      contactName,
      contactNumber,
      facilities: JSON.parse(facilities), // if sending as stringified JSON
      coverImageUrl,
    });

    await newPackage.save();
    res.status(201).json({ msg: 'Package created successfully', package: newPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to create package', error });
  }
});

module.exports = router;
