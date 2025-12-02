import React, { useState } from 'react'; // React to make the page, useState for saving what you type
import axios from 'axios'; // To send data to backend
import bcrypt from 'bcryptjs'; // To hide password (hash it)

function Register() {
  const [username, setUsername] = useState(''); // Save username you type
  const [password, setPassword] = useState(''); // Save password you type

  const handleRegister = async () => { // When you click "Register"
    const salt = await bcrypt.genSalt(10); // Magic salt for hiding password
    const hashedPassword = await bcrypt.hash(password, salt); // Hide password so no one can see it
    try {
      // Send username and hidden password to backend (encryption comes later)
      await axios.post('http://localhost:8080/api/register', { username, password: hashedPassword });
      alert('Signed up! Now login'); // Happy message
      window.location.href = '/login'; // Go to login page
    } catch (error) {
      alert('Sign up failed — try different username'); // Sad message
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}> // Simple center style
      <h1>Sign Up</h1> // Title
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} style={inputStyle} /> // Username box
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={inputStyle} /> // Password box
      <button onClick={handleRegister} style={buttonStyle} >Register</button> // Button
      <p>Already have account? <a href="/login">Login</a></p> // Link to login
    </div>
  );
}

// Nice looks for boxes and button
const inputStyle = { margin: '10px', padding: '10px', width: '200px' };
const buttonStyle = { padding: '10px 20px', background: 'green', color: 'white' };

export default Register;