import React, { useEffect, useState } from 'react';

function Rides() {
  const [rides, setRides] = useState([]);
  const [seats, setSeats] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5050/api/ride')
      .then(res => res.json())
      .then(data => setRides(data.rides));
  }, []);

  const bookRide = async (rideId) => {
    const seatsBooked = Number(seats[rideId] || 1);
    const res = await fetch('http://localhost:5050/api/booking/book', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rideId, seatsBooked })
    });
    const data = await res.json();
    if (data.booking) {
      setMessage('Booking successful!');
    } else {
      setMessage(data.error);
    }
  };

  const mainContainer = {
    background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
    minHeight: '100vh',
    padding: '0',
  };

  const headerStyle = {
    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
    color: 'white',
    padding: '36px 0 24px 0',
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: '2px',
    borderBottomLeftRadius: '32px',
    borderBottomRightRadius: '32px',
    boxShadow: '0 8px 32px rgba(33,150,243,0.18)',
    marginBottom: 32,
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '28px',
    boxShadow: '0 8px 32px rgba(33,150,243,0.13)',
    padding: '32px',
    margin: '32px auto',
    textAlign: 'left',
    maxWidth: 520,
    position: 'relative',
    border: '2px solid #e3f2fd',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const rideTitle = {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#1976d2',
    marginBottom: 6,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  const rideDetails = {
    color: '#1565c0',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  };

  const inputStyle = {
    borderRadius: '12px',
    border: '2px solid #1976d2',
    padding: '8px 16px',
    fontSize: '16px',
    marginRight: '12px',
    outline: 'none',
    boxShadow: '0 2px 8px #e3f2fd',
    width: 80,
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    padding: '10px 28px',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(33,150,243,0.10)',
    transition: 'background 0.3s, transform 0.2s',
    marginTop: '8px',
  };

  const messageStyle = {
    color: message === 'Booking successful!' ? '#388e3c' : '#d32f2f',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 24,
    textAlign: 'center',
  };

  return (
    <div style={mainContainer}>
      <div style={headerStyle}><span role="img" aria-label="car" style={{fontSize: 36, marginRight: 12}}>🚗</span>Available Rides</div>
      {rides.map(ride => (
        <div key={ride._id} style={cardStyle}>
          <div style={rideTitle}><span role="img" aria-label="route">🛣️</span>{ride.origin} → {ride.destination}</div>
          <div style={rideDetails}>Date: <span style={{color:'#1976d2'}}>{new Date(ride.date).toLocaleString()}</span></div>
          <div style={rideDetails}>Seats Available: <span style={{color:'#388e3c'}}>{ride.seats}</span></div>
          <div style={rideDetails}>Price: <span style={{color:'#d32f2f'}}>₹{ride.price}</span></div>
          <div style={{display:'flex',alignItems:'center',marginTop:8}}>
            <input type="number" min="1" max={ride.seats} value={seats[ride._id] || 1}
              style={inputStyle}
              onChange={e => setSeats({ ...seats, [ride._id]: e.target.value })} />
            <button style={buttonStyle} onClick={() => bookRide(ride._id)}>Book</button>
          </div>
        </div>
      ))}
      {message && <div style={messageStyle}>{message}</div>}
    </div>
  );
}

export default Rides;
