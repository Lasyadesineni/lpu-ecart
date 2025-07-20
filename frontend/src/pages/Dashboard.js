
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



// --- Enhanced Blue & White Dashboard ---
const gradientHeader = {
  background: 'linear-gradient(90deg, #1565c0 0%, #42a5f5 100%)',
  color: 'white',
  padding: '48px 0 36px 0',
  fontSize: '36px',
  fontWeight: 'bold',
  borderBottomLeftRadius: '40px',
  borderBottomRightRadius: '40px',
  boxShadow: '0 12px 40px rgba(33,150,243,0.18)',
  textAlign: 'center',
  letterSpacing: '2px',
};

const mainContainer = {
  background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
  minHeight: '100vh',
  paddingBottom: 120,
};

const cardStyle = {
  background: 'rgba(255,255,255,0.85)',
  borderRadius: '36px',
  boxShadow: '0 16px 48px 0 rgba(33,150,243,0.15)',
  padding: '56px',
  margin: '56px auto',
  textAlign: 'center',
  maxWidth: 540,
  position: 'relative',
  border: '2px solid #e3f2fd',
  backdropFilter: 'blur(8px)',
  transition: 'box-shadow 0.3s',
}

const avatarStyle = {
  background: 'linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)',
  color: 'white',
  borderRadius: '50%',
  width: 90,
  height: 90,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 40,
  fontWeight: 'bold',
  marginRight: 36,
  boxShadow: '0 8px 32px rgba(33,150,243,0.22)',
  border: '5px solid #fff',
  borderBottom: '5px solid #42a5f5',
  transition: 'box-shadow 0.3s',
}

const buttonStyle = {
  background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '32px',
  padding: '20px 48px',
  fontWeight: 'bold',
  fontSize: '24px',
  margin: '24px 18px',
  cursor: 'pointer',
  boxShadow: '0 6px 20px rgba(33,150,243,0.13)',
  transition: 'background 0.3s, transform 0.2s',
  outline: 'none',
}

const buttonHoverStyle = {
  background: 'linear-gradient(90deg, #42a5f5 0%, #1976d2 100%)',
  transform: 'scale(1.08)',
  boxShadow: '0 8px 32px rgba(33,150,243,0.18)',
}

const infoText = {
  color: '#1565c0',
  fontWeight: 'bold',
  fontSize: '22px',
  marginBottom: 12,
  letterSpacing: '1.5px',
  textShadow: '0 2px 8px #e3f2fd',
}

const tripCardStyle = {
  ...cardStyle,
  maxWidth: 660,
  marginTop: 0,
  background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
  border: '2px solid #bbdefb',
  boxShadow: '0 16px 48px 0 rgba(33,150,243,0.12)',
}

const tripImageStyle = {
  width: '100%',
  borderRadius: '28px',
  marginBottom: 28,
  boxShadow: '0 12px 40px rgba(33,150,243,0.13)',
  border: '2px solid #e3f2fd',
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5050/api/user/profile', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setProfile(data.user));
    fetch('http://localhost:5050/api/wallet', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setWallet(data.wallet?.balance || 0));
  }, []);

  // Button hover state
  const [hovered, setHovered] = useState('');

  return (
    <div style={mainContainer}>
      <div style={gradientHeader}>
        <span style={{fontSize: 44, marginRight: 16, verticalAlign: 'middle'}}>🌐</span>
        Welcome to Your Dashboard
      </div>
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 48 }}>
          <div style={avatarStyle}>
            <span role="img" aria-label="avatar" style={{fontSize: 48}}>{profile?.name ? profile.name[0].toUpperCase() : 'U'}</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 'bold', fontSize: 32, marginBottom: 8, color: '#1565c0', textShadow: '0 2px 8px #e3f2fd' }}>{profile?.name || 'User'}</div>
            <div style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 22 }}>{profile?.username}</div>
            <div style={{ color: '#666', fontSize: 18 }}>{profile?.email}</div>
          </div>
        </div>
        <div style={infoText}>Wallet Balance</div>
        <div style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 32, color: '#1976d2', letterSpacing: '2px', background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)', borderRadius: 18, padding: '16px 0', boxShadow: '0 2px 8px #bbdefb' }}>₹ {wallet}</div>
        <div>
          <button
            style={hovered === 'ride' ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setHovered('ride')}
            onMouseLeave={() => setHovered('')}
            onClick={() => navigate('/rides')}
          >🚗 Take a Ride</button>
          <button
            style={hovered === 'wallet' ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setHovered('wallet')}
            onMouseLeave={() => setHovered('')}
            onClick={() => navigate('/wallet')}
          >💳 Topup Wallet</button>
        </div>
      </div>
      <div style={tripCardStyle}>
        <img src="https://www.kinghillstravels.com/assets/img/shimla.jpg" alt="Shimla" style={tripImageStyle} />
        <div style={{ fontWeight: 'bold', fontSize: 32, marginBottom: 12, color: '#1565c0', textShadow: '0 2px 8px #e3f2fd' }}>Plan Your Trip with Us</div>
        <div style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 24, marginBottom: 12 }}>SHIMLA</div>
        <div style={{ fontWeight: 'bold', color: '#388e3c', fontSize: 24 }}>Rs - 3,499/-</div>
        <div style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 22 }}>APR 19</div>
        <div style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 22 }}>+91-9988105427</div>
      </div>
      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'linear-gradient(90deg, #e3f2fd 0%, #ffffff 100%)',
        borderTop: '2px solid #e3f2fd',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        zIndex: 100,
        boxShadow: '0 -4px 24px rgba(33,150,243,0.10)',
        backdropFilter: 'blur(4px)',
      }}>
        <div onClick={() => navigate('/dashboard')} style={{ textAlign: 'center', color: '#1565c0', cursor: 'pointer', fontWeight: 'bold', fontSize: 22, transition: 'color 0.2s' }}>
          <span role="img" aria-label="home" style={{ fontSize: 40 }}>🏠</span><br />Home
        </div>
        <div onClick={() => navigate('/wallet')} style={{ textAlign: 'center', color: '#1565c0', cursor: 'pointer', fontWeight: 'bold', fontSize: 22, transition: 'color 0.2s' }}>
          <span role="img" aria-label="wallet" style={{ fontSize: 40 }}>💳</span><br />Wallet
        </div>
        <div onClick={() => navigate('/rides')} style={{ textAlign: 'center', color: '#1565c0', cursor: 'pointer', fontWeight: 'bold', fontSize: 22, transition: 'color 0.2s' }}>
          <span role="img" aria-label="rides" style={{ fontSize: 40 }}>🚗</span><br />Rides
        </div>
        <div onClick={() => navigate('/profile')} style={{ textAlign: 'center', color: '#1565c0', cursor: 'pointer', fontWeight: 'bold', fontSize: 22, transition: 'color 0.2s' }}>
          <span role="img" aria-label="profile" style={{ fontSize: 40 }}>👤</span><br />Profile
        </div>
      </div>
    </div>
  );
};

export default Dashboard;