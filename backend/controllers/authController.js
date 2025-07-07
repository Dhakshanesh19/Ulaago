const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Signup Controller (handles user & admin)
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const idProof = req.file ? req.file.filename : null;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      idProof, // Only relevant for admin
    });

    res.status(201).json({ msg: 'User created', user: newUser });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,           // only true in production (HTTPS)
      sameSite: 'Lax',         // or 'None' if using HTTPS with secure: true
      maxAge: 24 * 60 * 60 * 1000,
    });
    

    res.status(200).json({ msg: 'Login successful', user });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Get Current User (after token verification)
exports.getCurrentUser = async (req, res) => {
  if (!req.user) return res.status(401).json({ msg: 'Unauthorized' });

  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    console.error('GetCurrentUser Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Logout (clear cookie)
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ msg: 'Logged out successfully' });
};
