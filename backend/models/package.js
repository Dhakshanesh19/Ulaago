const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  coverImageUrl: { type: String, required: true },
  dates: String,
  vlogLink: String,
  contactName: String,
  contactNumber: String,
  facilities: {
    Hotel: { type: Boolean, default: false },
    Guide: { type: Boolean, default: false },
    Food: { type: Boolean, default: false },
    Activities: { type: Boolean, default: false },
    BikeRental: { type: Boolean, default: false },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
