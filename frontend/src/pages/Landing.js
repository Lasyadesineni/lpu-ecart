import React from 'react';
import { useNavigate } from 'react-router-dom';

const landingStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #1976d2 0%, #42a5f5 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
};

const cardStyle = {
  background: 'white',
  color: '#1976d2',
  borderRadius: '24px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
  padding: '40px 32px',
  textAlign: 'center',
  maxWidth: 400,
};

const buttonStyle = {
  background: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '24px',
  padding: '16px 32px',
  fontWeight: 'bold',
  fontSize: '18px',
  marginTop: '24px',
  cursor: 'pointer',
};

function Landing() {
  const navigate = useNavigate();
  return (
    <div style={landingStyle}>
      <div style={cardStyle}>
        <h1>Welcome to Ekart</h1>
        <p>Book rides, manage your wallet, and view your bookings with ease.</p>
        <button style={buttonStyle} onClick={() => navigate('/login')}>Get Started</button>
      </div>
    </div>
  );
}

export default Landing;
