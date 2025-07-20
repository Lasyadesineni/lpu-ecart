const express = require('express');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, password, name, email } = req.body;
    try {
        const user = await User.create({ username, password, name, email });
        await Wallet.create({ userId: user._id });
        req.session.userId = user._id;
        res.json({ success: true, user });
    } catch (err) {
        res.status(400).json({ error: 'Username already exists' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        req.session.userId = user._id;
        res.json({ success: true, user });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Profile
router.get('/profile', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
    const user = await User.findById(req.session.userId);
    res.json({ user });
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

module.exports = router;
