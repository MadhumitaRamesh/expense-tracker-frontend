import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:9090/api/login', { username, password });
    localStorage.setItem('token', res.data.token);
    window.location.href = '/dashboard';
  } catch (e) {
    alert('Error: ' + (e.response?.data || e.message));
  }
};
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Login</h1>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '12px', width: '300px' }} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '12px', width: '300px' }} /><br/>
      <button onClick={handleLogin} style={{ padding: '15px 40px', background: '#2196F3', color: 'white', border: 'none', fontSize: '16px' }}>Login</button>
      <p>New user? <a href="/register">Register here</a></p>
    </div>
  );
}

export default Login;