// backend/controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Signup Controller
exports.signup = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    const idProof = req.file ? req.file.filename : null;

    // Trim and sanitize inputs
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();
    role = role?.trim().toLowerCase() || 'user';

    // Validate basic fields
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Name, email, and password are required' });
    }

    // Admin signup must include ID proof
    if (role === 'admin' && !idProof) {
      return res.status(400).json({ msg: 'Admin must upload ID proof' });
    }

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      idProof: role === 'admin' ? idProof : null,
    });

    res.status(201).json({ msg: `${role === 'admin' ? 'Admin' : 'User'} created`, user: newUser });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Login Controller (blocks admin from logging in via user login form if role mismatch)
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // If role is provided in request, make sure it matches stored role
    if (role && role !== user.role) {
      return res.status(403).json({ msg: `You are not allowed to login as ${role}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // ✅ Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ msg: 'Login successful', user });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Get Current Logged-in User
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    console.error('GetCurrentUser Error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Logout
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  });

  return res.status(200).json({ msg: 'Logged out successfully' });
};
