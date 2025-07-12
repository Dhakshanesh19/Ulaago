const multer = require('multer');
const path = require('path');

// Define storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/booking'); // Save to /uploads/booking/
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

// Accept only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG files are allowed'));
  }
};

// Accept 2 fields: idProof and photo
const uploadBookingProof = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
}).fields([
  { name: 'idProof', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
]);

module.exports = uploadBookingProof;
