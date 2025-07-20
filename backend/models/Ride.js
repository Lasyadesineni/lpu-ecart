const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    date: Date,
    seats: Number,
    price: Number
});

module.exports = mongoose.model('Ride', RideSchema);
