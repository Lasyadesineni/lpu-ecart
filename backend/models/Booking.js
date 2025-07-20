const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
    seatsBooked: Number,
    status: String
});

module.exports = mongoose.model('Booking', BookingSchema);
