import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // FAKE LOGIN — works 100% without backend
    localStorage.setItem('token', 'fake-jwt-token-123');
    alert('Welcome back!');
    navigate('/dashboard');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2c3e50' }}>Expense Tracker</h1>
      <h2 style={{ color: '#34495e' }}>Welcome Back!</h2>

      <input
        type="text"
        placeholder="Enter username"
        style={inputStyle}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        style={inputStyle}
      />
      <br />
      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>
      <p style={{ marginTop: '20px', color: '#7f8c8d' }}>
        New here? <a href="/register" style={{ color: '#3498db' }}>Create account</a>
      </p>
    </div>
  );
}

const inputStyle = {
  padding: '14px',
  margin: '10px',
  width: '300px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #ddd'
};

const buttonStyle = {
  padding: '16px 50px',
  background: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '18px',
  cursor: 'pointer',
  marginTop: '20px'
};

export default Login;