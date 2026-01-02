import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Dashboard mounted, token present:', !!token);

    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }
    fetchExpenses(token);
  }, [navigate]);

  const fetchExpenses = async (token) => {
    try {
      console.log('Fetching expenses from:', `${API_URL}/api/expenses`);
      const res = await axios.get(`${API_URL}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Successfully fetched expenses:', res.data.length);
      setExpenses(res.data);
    } catch (e) {
      console.error('Error fetching expenses:', e);
      if (e.response) {
        console.error('Response status:', e.response.status);
        console.error('Response data:', e.response.data);
        console.error('Response headers:', e.response.headers);
      } else {
        console.error('No response received - potential CORS or Network error. Check if backend is running on:', API_URL);
      }

      if (e.response?.status === 401 || e.response?.status === 403) {
        console.warn('Session invalid or access forbidden (401/403), redirecting to login in 1.5 seconds...');
        // Add a small delay so user can see the dashboard briefly or we can see the logs
        setTimeout(() => {
          localStorage.removeItem('token');
          // navigate('/login'); // Temporarily commented out to debug the 403 issue visually if it persists
        }, 1500);
      }
    }
  };

  const addExpense = async () => {
    if (!amount) return;
    const token = localStorage.getItem('token');
    try {
      const newExpense = {
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString().split('T')[0],
        note
      };
      await axios.post(`${API_URL}/api/expenses`, newExpense, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAmount('');
      setNote('');
      fetchExpenses();
    } catch (e) {
      console.error('Error adding expense:', e);
      alert('Failed to add expense');
    }
  };

  const deleteExpense = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchExpenses(token);
    } catch (e) {
      console.error('Error deleting expense:', e);
      alert('Failed to delete expense');
    }
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // PIE CHART
  const pieData = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'].map(cat => ({
    name: cat,
    value: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
  })).filter(d => d.value > 0);
  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];

  // BAR CHART - LAST 7 DAYS
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();
  const barData = last7Days.map(date => ({
    date: date.slice(5), // Show only MM-DD
    spent: expenses
      .filter(e => e.date === date)
      .reduce((sum, e) => sum + e.amount, 0)
  }));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', background: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Your Expenses Dashboard</h1>
      <h2 style={{ textAlign: 'center', color: '#27ae60', fontSize: '28px' }}>
        Total Spent: ₹{total.toFixed(2)}
      </h2>

      {/* Add Form */}
      <div style={{ textAlign: 'center', margin: '30px', padding: '25px', background: 'white', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} style={inputStyle} />
        <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
          <option>Food</option><option>Transport</option><option>Shopping</option><option>Bills</option><option>Other</option>
        </select>
        <input placeholder="Note" value={note} onChange={e => setNote(e.target.value)} style={inputStyle} />
        <button onClick={addExpense} style={greenButton}>Add Expense</button>
      </div>

      {/* Charts Side by Side */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '40px', margin: '40px 0' }}>
        {/* Pie Chart */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>Spending by Category</h3>
          <PieChart width={380} height={320}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
              {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>Last 7 Days</h3>
          <BarChart width={380} height={320} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="spent" fill="#3498db" radius={[10, 10, 0, 0]} />
          </BarChart>
        </div>
      </div>

      {/* Expense List */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>Recent Expenses</h3>
        {expenses.map(exp => (
          <div key={exp.id} style={{ background: 'white', padding: '18px', margin: '12px 0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div>
              <strong style={{ fontSize: '20px', color: '#27ae60' }}>₹{exp.amount}</strong>
              <span style={{ marginLeft: '10px', color: '#2c3e50' }}>{exp.category}</span>
              <small style={{ color: '#7f8c8d', marginLeft: '10px' }}>({exp.date})</small>
              {exp.note && <span style={{ marginLeft: '10px', color: '#95a5a6' }}>→ {exp.note}</span>}
            </div>
            <button onClick={() => deleteExpense(exp.id)} style={redButton}>Delete</button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', margin: '50px 0' }}>
        <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} style={logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

const inputStyle = { padding: '14px', margin: '8px', borderRadius: '10px', border: '1px solid #ddd', width: '180px', fontSize: '16px' };
const greenButton = { padding: '14px 40px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '18px' };
const redButton = { padding: '10px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const logoutButton = { padding: '16px 50px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '18px' };

export default Dashboard;