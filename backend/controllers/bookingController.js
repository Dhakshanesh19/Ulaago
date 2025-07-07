const Booking = require('../models/booking');

// ✅ Create a new booking (User)
exports.createBooking = async (req, res) => {
  const { packageId, bookingDate } = req.body;

  try {
    const booking = await Booking.create({
      user: req.user.id,
      package: packageId,
      bookingDate,
      status: 'pending',
    });

    res.status(201).json({ msg: 'Booking request submitted', booking });
  } catch (err) {
    console.error('Create Booking Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Get bookings for the logged-in user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('package', 'packageName location price')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Get My Bookings Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Get all pending bookings (Admin dashboard)
exports.getPendingBookings = async (req, res) => {
  try {
    const pending = await Booking.find({ status: 'pending' })
      .populate('user', 'name email')
      .populate('package', 'packageName location');

    res.status(200).json(pending);
  } catch (err) {
    console.error('Get Pending Bookings Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Approve a booking (Admin)
exports.approveBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Booking.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error('Approve Booking Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Reject a booking (Admin)
exports.rejectBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Booking.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error('Reject Booking Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
