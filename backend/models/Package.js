const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  packageName: String,
  location: String,
  duration: String,
  price: Number,
  description: String,
  dates: String,
  vlogLink: String,
  contactName: String,
  contactNumber: String,
  coverImageUrl: String, // ← image URL stored
  facilities: {
    Hotel: Boolean,
    Guide: Boolean,
    Food: Boolean,
    Activities: Boolean,
    BikeRental: Boolean,
  },
});

module.exports = mongoose.model('Package', packageSchema);
