import React from 'react';
import { useNavigate } from 'react-router-dom';

const gradientHeader = {
  background: 'linear-gradient(180deg, #1976d2 0%, #42a5f5 100%)',
  color: 'white',
  padding: '24px 0 16px 24px',
  fontSize: '24px',
  fontWeight: 'bold',
  borderBottomLeftRadius: '24px',
  borderBottomRightRadius: '24px',
};

const cardStyle = {
  background: 'white',
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: '24px',
  margin: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const buttonStyle = {
  background: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '24px',
  padding: '12px 32px',
  fontWeight: 'bold',
  margin: '8px 0',
  cursor: 'pointer',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const user = { name: 'Niharika', type: 'Student', wallet: 0 };

  return (
    <div style={{ background: '#f5f6fa', minHeight: '100vh' }}>
      <div style={gradientHeader}>Dashboard</div>
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <div style={{
            background: '#1976d2',
            color: 'white',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            marginRight: 16,
          }}>N</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{user.name}</div>
            <div style={{ color: '#666' }}>{user.type}</div>
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>Wallet Balance</div>
        <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>₹ {user.wallet}</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button style={buttonStyle} onClick={() => navigate('/rides')}>TAKE RIDE</button>
          <button style={buttonStyle} onClick={() => navigate('/wallet')}>Topup Wallet</button>
        </div>
      </div>
      <div style={cardStyle}>
        <img src="https://www.kinghillstravels.com/assets/img/shimla.jpg" alt="Shimla" style={{ width: '100%', borderRadius: '12px', marginBottom: 12 }} />
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>Plan Your Trip with us</div>
        <div style={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 8 }}>SHIMLA</div>
        <div>Rs - 3,499/-</div>
        <div>APR 19</div>
        <div>+91-9988105427</div>
      </div>
      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'white',
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 64,
      }}>
        <div onClick={() => navigate('/dashboard')} style={{ textAlign: 'center', color: '#1976d2' }}>
          <span role="img" aria-label="home" style={{ fontSize: 24 }}>🏠</span><br />Home
        </div>
        <div onClick={() => navigate('/wallet')} style={{ textAlign: 'center', color: '#1976d2' }}>
          <span role="img" aria-label="wallet" style={{ fontSize: 24 }}>💳</span><br />Wallet
        </div>
        <div onClick={() => navigate('/rides')} style={{ textAlign: 'center', color: '#1976d2' }}>
          <span role="img" aria-label="rides" style={{ fontSize: 24 }}>🚗</span><br />Rides
        </div>
        <div onClick={() => navigate('/profile')} style={{ textAlign: 'center', color: '#1976d2' }}>
          <span role="img" aria-label="profile" style={{ fontSize: 24 }}>👤</span><br />Profile
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
