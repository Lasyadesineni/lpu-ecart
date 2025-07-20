import React, { useEffect, useState } from 'react';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  const fetchBookings = () => {
    fetch('http://localhost:5050/api/booking', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setBookings(data.bookings));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    await fetch('http://localhost:5050/api/booking/cancel', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId })
    });
    setMessage('Booking cancelled and refunded!');
    fetchBookings();
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.map(b => (
        <div key={b._id}>
          <p>{b.rideId.origin} → {b.rideId.destination} | Seats: {b.seatsBooked} | Status: {b.status}</p>
          {b.status === 'Booked' && <button onClick={() => cancelBooking(b._id)}>Cancel</button>}
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Bookings;
