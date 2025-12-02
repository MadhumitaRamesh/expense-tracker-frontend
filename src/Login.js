import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const salt = await bcrypt.genSalt(10); // Salt for hiding
    const hashedPassword = await bcrypt.hash(password, salt); // Hide password
    try {
      const response = await axios.post('http://localhost:8080/api/login', { username, password: hashedPassword });
      localStorage.setItem('token', response.data.token); // Save JWT token (boss's authorisation)
      window.location.href = '/dashboard'; // Go to dashboard
    } catch (error) {
      alert('Login failed — wrong username or password');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <button onClick={handleLogin} style={buttonStyle} >Login</button>
      <p>New? <a href="/register">Sign Up</a></p>
    </div>
  );
}

const inputStyle = { margin: '10px', padding: '10px', width: '200px' };
const buttonStyle = { padding: '10px 20px', background: 'blue', color: 'white' };

export default Login;