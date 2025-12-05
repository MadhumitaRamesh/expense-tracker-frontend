import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { encrypt, decrypt } from './utils/encryption';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Encrypt username and password before sending
      const encryptedUsername = encrypt(username);
      const encryptedPassword = encrypt(password);

      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/auth/register`, {
        username: encryptedUsername,
        password: encryptedPassword
      });

      alert('Registered successfully!');
      window.location.href = '/login';

    } catch (e) {
      // Try to decrypt error message if it's encrypted
      let errorMessage = e.response?.data || e.message;
      try {
        if (typeof errorMessage === 'string' && errorMessage.length > 20) {
          errorMessage = decrypt(errorMessage);
        }
      } catch (decryptError) {
        // If decryption fails, use original message
      }
      alert('Error: ' + errorMessage);
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

      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;