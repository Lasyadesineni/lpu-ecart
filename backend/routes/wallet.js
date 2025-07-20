const express = require('express');
const Wallet = require('../models/Wallet');
const router = express.Router();

// Get wallet balance
router.get('/', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
    const wallet = await Wallet.findOne({ userId: req.session.userId });
    res.json({ wallet });
});

// Add funds
router.post('/add', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ userId: req.session.userId });
    wallet.balance += amount;
    await wallet.save();
    res.json({ wallet });
});

module.exports = router;
