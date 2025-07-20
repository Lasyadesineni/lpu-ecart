const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

const userRoutes = require('./routes/user');
const rideRoutes = require('./routes/ride');
const bookingRoutes = require('./routes/booking');
const walletRoutes = require('./routes/wallet');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: 'ekart_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // allow cookies over http for local dev
        sameSite: 'lax', // allow cross-site cookies for localhost
        httpOnly: true
    }
}));

mongoose.connect('mongodb://localhost:27017/ekart', { useNewUrlParser: true, useUnifiedTopology: true });

// Add this test route to verify server is running
app.get('/api/test', (req, res) => {
    res.json({ message: 'Ekart backend is running!' });
});

app.use('/api/user', userRoutes);
app.use('/api/ride', rideRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/wallet', walletRoutes);

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
