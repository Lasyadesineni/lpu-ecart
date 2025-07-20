import React, { useEffect, useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5050/api/user/profile', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setProfile(data.user));
  }, []);

  const mainContainer = {
    background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.85)',
    borderRadius: '36px',
    boxShadow: '0 16px 48px 0 rgba(33,150,243,0.15)',
    padding: '56px 44px',
    textAlign: 'center',
    maxWidth: 420,
    width: '100%',
    border: '2px solid #e3f2fd',
    backdropFilter: 'blur(10px)',
    transition: 'box-shadow 0.3s',
    position: 'relative',
  };

  const avatarStyle = {
    background: 'linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)',
    color: 'white',
    borderRadius: '50%',
    width: 90,
    height: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 44,
    fontWeight: 'bold',
    margin: '0 auto 28px auto',
    boxShadow: '0 8px 32px rgba(33,150,243,0.22)',
    border: '5px solid #fff',
    borderBottom: '5px solid #42a5f5',
    transition: 'box-shadow 0.3s',
    animation: 'avatarPulse 1.5s infinite alternate',
  };

  const dividerStyle = {
    height: 2,
    width: '60%',
    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
    borderRadius: 2,
    margin: '24px auto',
    opacity: 0.2,
  };

  const labelStyle = {
    color: '#1565c0',
    fontWeight: 'bold',
    fontSize: '19px',
    marginBottom: 8,
    letterSpacing: '1.5px',
    textAlign: 'left',
    textShadow: '0 2px 8px #e3f2fd',
  };

  const valueStyle = {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: '22px',
    marginBottom: 20,
    textAlign: 'left',
    background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)',
    borderRadius: 10,
    padding: '8px 12px',
    boxShadow: '0 2px 8px #bbdefb',
  };

  // Add keyframes for avatar animation
  const avatarKeyframes = `@keyframes avatarPulse { 0% { box-shadow: 0 8px 32px rgba(33,150,243,0.22); } 100% { box-shadow: 0 16px 48px rgba(33,150,243,0.32); } }`;

  return (
    <>
      <style>{avatarKeyframes}</style>
      <div style={mainContainer}>
        <div style={cardStyle}>
          <div style={avatarStyle}>
            <span role="img" aria-label="avatar">{profile?.name ? profile.name[0].toUpperCase() : 'U'}</span>
          </div>
          <div style={{ fontWeight: 'bold', fontSize: 32, marginBottom: 20, color: '#1565c0', letterSpacing: '1.5px', textShadow: '0 2px 8px #e3f2fd' }}>Profile</div>
          <div style={dividerStyle}></div>
          {profile ? (
            <div style={{ textAlign: 'left' }}>
              <div style={labelStyle}>Name</div>
              <div style={valueStyle}>{profile.name}</div>
              <div style={labelStyle}>Username</div>
              <div style={valueStyle}>{profile.username}</div>
              <div style={labelStyle}>Email</div>
              <div style={valueStyle}>{profile.email}</div>
            </div>
          ) : (
            <div style={{ color: '#1976d2', fontWeight: 'bold', fontSize: 20 }}>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
