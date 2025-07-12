const Booking = require('../models/booking');
const Package = require('../models/Package');
const path = require('path');

// ✅ Create a new booking (User)
// ✅ Create a new booking (User)
exports.createBooking = async (req, res) => {
  console.log('🟡 req.body:', req.body);
  console.log('🟢 req.files:', req.files);

  try {
    const userId = req.user._id;
    const { packageId, paymentType, numDays, mobileNumber } = req.body;

    if (!packageId || !paymentType || !numDays || !mobileNumber) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ msg: 'Package not found' });

    const idProofFile = req.files?.idProof?.[0];
    const personalPhotoFile = req.files?.personalPhoto?.[0];

    if (!idProofFile || !personalPhotoFile) {
      return res.status(400).json({ msg: 'Both ID proof and personal photo are required' });
    }

    // ✅ FIX: Get just filename, not full path
    const idProof = '/uploads/' + idProofFile.filename;
    const personalPhoto = '/uploads/' + personalPhotoFile.filename;

    const booking = await Booking.create({
      user: userId,
      package: packageId,
      admin: pkg.createdBy,
      paymentType,
      numDays,
      mobileNumber,
      idProof,
      personalPhoto,
      bookingDate: new Date(),
      status: 'pending',
      isCompleted: false,
    });

    res.status(201).json({ msg: 'Booking created', booking });
  } catch (err) {
    console.error('❌ Booking failed:', err);
    res.status(500).json({ msg: 'Booking failed', error: err.message });
  }
};



// ✅ Get bookings for the logged-in user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('package', 'packageName location price coverImageUrl')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Get My Bookings Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Get all pending bookings (Admin)
exports.getPendingBookings = async (req, res) => {
  try {
    const pending = await Booking.find({
      status: 'pending',
      admin: req.user._id,
    })
      .populate('user', 'name email')
      .populate('package', 'packageName location coverImageUrl');

    res.status(200).json(pending);
  } catch (err) {
    console.error('Get Pending Bookings Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Approve a booking (Admin)
exports.approveBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Booking.findOneAndUpdate(
      { _id: id, admin: req.user._id },
      { status: 'approved' },
      { new: true }
    );

    if (!updated) return res.status(403).json({ msg: 'Not authorized to approve this booking' });

    res.status(200).json(updated);
  } catch (err) {
    console.error('Approve Booking Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Reject a booking (Admin)
exports.rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Booking.findOneAndUpdate(
      { _id: id, admin: req.user._id },
      { status: 'rejected' },
      { new: true }
    );

    if (!updated) return res.status(403).json({ msg: 'Not authorized to reject this booking' });

    res.status(200).json(updated);
  } catch (err) {
    console.error('Reject Booking Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Mark a booking as completed (Admin)
exports.markCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Booking.findOneAndUpdate(
      { _id: id, admin: req.user._id },
      { isCompleted: true },
      { new: true }
    );

    if (!updated) return res.status(403).json({ msg: 'Not authorized to complete this booking' });

    res.status(200).json({ msg: 'Booking marked as completed', booking: updated });
  } catch (err) {
    console.error('Mark Completed Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Get all bookings for admin (History Page)
exports.getAllHistory = async (req, res) => {
  try {
    const all = await Booking.find({ admin: req.user._id })
      .populate('user', 'name email')
      .populate('package', 'packageName location coverImageUrl')
      .sort({ bookingDate: -1 });

    res.status(200).json(all);
  } catch (err) {
    console.error('History Fetch Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Get approved but not completed bookings (Dashboard)
exports.getApprovedUncompleted = async (req, res) => {
  try {
    const result = await Booking.find({
      status: 'approved',
      isCompleted: false,
      admin: req.user._id,
    })
      .populate('user', 'name email')
      .populate('package', 'packageName location coverImageUrl');

    res.status(200).json(result);
  } catch (err) {
    console.error('Fetch Approved Uncompleted Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Count completed trips (Admin)
exports.getCompletedCount = async (req, res) => {
  try {
    const count = await Booking.countDocuments({
      status: 'approved',
      isCompleted: true,
      admin: req.user._id,
    });

    res.status(200).json({ completedTrips: count });
  } catch (err) {
    console.error('Completed Trips Count Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
