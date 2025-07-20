
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const bgStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #1976d2 0%, #42a5f5 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cardStyle = {
  background: 'white',
  borderRadius: '24px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
  padding: '40px 32px',
  textAlign: 'center',
  minWidth: 320,
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  margin: '12px 0',
  borderRadius: '12px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  background: '#1976d2',
  color: 'white',
  border: 'none',
  borderRadius: '24px',
  padding: '14px 0',
  width: '100%',
  fontWeight: 'bold',
  fontSize: '18px',
  margin: '16px 0',
  cursor: 'pointer',
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:5050/api/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } else {
      setError(data.error);
    }
  };

  return (
    <div style={bgStyle}>
      <form style={cardStyle} onSubmit={handleLogin}>
        <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Login</h2>
        <input
          style={inputStyle}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button style={buttonStyle} type="submit">Login</button>
        <button
          style={{ ...buttonStyle, background: '#42a5f5', marginTop: 0 }}
          type="button"
          onClick={() => navigate('/register')}
        >Sign Up</button>
        {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
