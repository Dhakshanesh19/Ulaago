const Booking = require('../models/booking');

exports.getPendingBookings = async (req, res) => {
  const pending = await Booking.find({ status: 'pending' }).populate('user').populate('package');
  res.json(pending);
};

exports.approveBooking = async (req, res) => {const Booking = require('../models/booking');

    exports.getPendingBookings = async (req, res) => {
      const pending = await Booking.find({ status: 'pending' }).populate('user').populate('package');
      res.json(pending);
    };
    
    exports.approveBooking = async (req, res) => {
      const { id } = req.params;
      const updated = await Booking.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
      res.json(updated);
    };
    
    exports.rejectBooking = async (req, res) => {
      const { id } = req.params;
      const updated = await Booking.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
      res.json(updated);
    };
    
  const { id } = req.params;
  const updated = await Booking.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
  res.json(updated);
};

exports.rejectBooking = async (req, res) => {
  const { id } = req.params;
  const updated = await Booking.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
  res.json(updated);
};
