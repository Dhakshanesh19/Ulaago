const Package = require('../models/package');

// ✅ Create a new package (admin only)
exports.createPackage = async (req, res) => {
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

    const coverImageUrl = req.file ? req.file.filename : null;

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
      coverImageUrl,
      facilities,
    });

    await newPackage.save();
    res.status(201).json({ msg: 'Package created successfully', package: newPackage });
  } catch (err) {
    console.error('Package Creation Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Get all packages (public)
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    console.error('Fetch All Packages Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Get package by ID
exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const pkg = await Package.findById(id);
    if (!pkg) return res.status(404).json({ msg: 'Package not found' });

    res.status(200).json(pkg);
  } catch (err) {
    console.error('Fetch Package Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Delete a package (admin only)
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Package.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ msg: 'Package not found' });

    res.status(200).json({ msg: 'Package deleted successfully' });
  } catch (err) {
    console.error('Delete Package Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
