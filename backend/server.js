const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const packageRoutes = require('./routes/packageRoutes');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ulaago';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/packages', packageRoutes);

// ✅ Health check route (optional)
app.get('/', (req, res) => {
  res.send('🌍 Ulaago API is running...');
});

// ✅ Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


