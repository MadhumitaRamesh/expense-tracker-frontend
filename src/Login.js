import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  the navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token); // Save JWT token
      alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      alert('Wrong username or password');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2c3e50' }}>Expense Tracker</h1>
      <h2 style={{ color: '#34495e' }}>Welcome Back!</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} /><br/>
      <button onClick={handleLogin} style={buttonStyle}>Login</button>
      <p style={{ marginTop: '20px', color: '#7f8c8d' }}>
        New here? <a href="/register" style={{ color: '#3498db' }}>Create account</a>
      </p>
    </div>
  );
}

const inputStyle = { padding: '14px', margin: '10px', width: '300px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ddd' };
const buttonStyle = { padding: '16px 50px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', marginTop: '20px' };

export default Login;