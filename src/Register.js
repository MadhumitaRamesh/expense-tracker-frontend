import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleRegister = async () => {
  const data = { username, password }; // Raw password
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'supersecretbabyenckey').toString(); // Boss's encryption - hides everything
  try {
    await axios.post('http://localhost:8080/api/register', encryptedData, { headers: { 'Content-Type': 'text/plain' } }); // Send encrypted
    alert('Signed up! Now login');
    window.location.href = '/login';
  } catch (error) {
    alert('Sign up failed');
  }
};

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2c3e50' }}>Expense Tracker</h1>
      <h2 style={{ color: '#34495e' }}>Create Account</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} /><br/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} /><br/>
      <button onClick={handleRegister} style={buttonStyle}>Register</button>
      <p style={{ marginTop: '20px', color: '#7f8c8d' }}>
        Already have account? <a href="/login" style={ { color: '#3498db' }}>Login here</a>
      </p>
    </div>
  );
}

const inputStyle = { padding: '14px', margin: '10px', width: '300px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ddd' };
const buttonStyle = { padding: '16px 50px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', marginTop: '20px' };

export default Register;