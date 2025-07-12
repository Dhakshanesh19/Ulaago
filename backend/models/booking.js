// models/booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ NEW FIELD
  bookingDate: { type: Date, default: Date.now },
  paymentType: { type: String, required: true },
  numDays: { type: Number, required: true },
  mobileNumber: { type: String, required: true },
  idProof: { type: String, required: true },
  personalPhoto: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
