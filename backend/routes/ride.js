const express = require('express');
const Ride = require('../models/Ride');
const router = express.Router();

// List rides
router.get('/', async (req, res) => {
    const rides = await Ride.find();
    res.json({ rides });
});

// Create ride (admin only, for demo)
router.post('/', async (req, res) => {
    const { origin, destination, date, seats, price } = req.body;
    const ride = await Ride.create({ origin, destination, date, seats, price });
    res.json({ ride });
});

module.exports = router;
