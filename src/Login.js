import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { encrypt, decrypt } from './utils/encryption';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Encrypt username and password before sending
      const encryptedUsername = encrypt(username);
      const encryptedPassword = encrypt(password);

      const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/auth/login`, {
        username: encryptedUsername,
        password: encryptedPassword,
      });

      // Decrypt token and username from backend response
      const encryptedToken = res.data?.token;
      const encryptedUsernameResponse = res.data?.username;

      if (encryptedToken) {
        const tokenFromServer = decrypt(encryptedToken);
        const usernameFromServer = decrypt(encryptedUsernameResponse);

        // ✅ store JWT token
        localStorage.setItem('token', tokenFromServer);
        // ✅ store username
        localStorage.setItem('username', usernameFromServer);

        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Login failed: Invalid response');
      }
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
      <h1>Login</h1>

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
        onClick={handleLogin}
        style={{ padding: '15px 40px', background: '#2196F3', color: 'white', border: 'none', fontSize: '16px' }}
      >
        Login
      </button>

      <p>New user? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
