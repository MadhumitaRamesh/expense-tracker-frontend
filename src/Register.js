import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        username,
        password
      });

      alert('Registered successfully!');
      window.location.href = '/login';

    } catch (e) {
      alert('Error: ' + (e.response?.data || e.message));
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Register</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '12px', width: '300px' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '12px', width: '300px' }}
      />

      <button
        onClick={handleRegister}
        style={{ padding: '15px 40px', background: '#4CAF50', color: 'white', border: 'none', fontSize: '16px' }}
      >
        Register
      </button>

      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
}

export default Register;