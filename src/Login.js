import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        username,
        password,
      });

      // try to read token + username from backend response
      const tokenFromServer = res.data?.token;
      const usernameFromServer = res.data?.username || username;

      if (tokenFromServer) {
        // ✅ store JWT token
        localStorage.setItem('token', tokenFromServer);
      }

      // ✅ always store username (from server if available)
      localStorage.setItem('username', usernameFromServer);

      alert('Login successful!');
      navigate('/dashboard');
    } catch (e) {
      alert('Error: ' + (e.response?.data || e.message));
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

      <p>New user? <a href="/register">Register here</a></p>
    </div>
  );
}

export default Login;
