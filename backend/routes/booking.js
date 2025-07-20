const express = require('express');
const Booking = require('../models/Booking');
const Ride = require('../models/Ride');
const Wallet = require('../models/Wallet');
const router = express.Router();

// List user's bookings
router.get('/', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
    const bookings = await Booking.find({ userId: req.session.userId }).populate('rideId');
    res.json({ bookings });
});

// Book a ride
router.post('/book', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
    const { rideId, seatsBooked } = req.body;
    const ride = await Ride.findById(rideId);
    if (!ride || ride.seats < seatsBooked) return res.status(400).json({ error: 'Not enough seats' });

    const wallet = await Wallet.findOne({ userId: req.session.userId });
    const totalPrice = ride.price * seatsBooked;
    if (wallet.balance < totalPrice) return res.status(400).json({ error: 'Insufficient balance' });

    ride.seats -= seatsBooked;
    await ride.save();

    wallet.balance -= totalPrice;
    await wallet.save();

    const booking = await Booking.create({
        userId: req.session.userId,
        rideId,
        seatsBooked,
        status: 'Booked'
    });

    res.json({ booking });
});

// Cancel booking
router.post('/cancel', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.userId.toString() !== req.session.userId) return res.status(400).json({ error: 'Invalid booking' });

    booking.status = 'Cancelled';
    await booking.save();

    const ride = await Ride.findById(booking.rideId);
    ride.seats += booking.seatsBooked;
    await ride.save();

    const wallet = await Wallet.findOne({ userId: req.session.userId });
    wallet.balance += ride.price * booking.seatsBooked;
    await wallet.save();

    res.json({ success: true });
});

module.exports = router;
