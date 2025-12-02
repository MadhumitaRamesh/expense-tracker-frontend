import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        username,
        password
      });
      alert('Registered successfully! Now login');
      navigate('/login');
    } catch (err) {
      alert('Registration failed — username might be taken');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1>Expense Tracker</h1>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '12px', margin: '8px', width: '280px', fontSize: '16px' }}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '12px', margin: '8px', width: '280px', fontSize: '16px' }}
      />
      <br />

      <button
        onClick={handleRegister}
        style={{
          padding: '14px 40px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Register
      </button>

      <p style={{ marginTop: '20px' }}>
        Already have an account? <a href="/login" style={{ color: '#4CAF50' }}>Login here</a>
      </p>
    </div>
  );
}

export default Register;