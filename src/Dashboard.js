import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';

function Dashboard() {
  // Fake data — works 100% without backend
  const [expenses, setExpenses] = useState([
    { id: 1, amount: 50, category: 'Food', date: '2025-12-01', note: 'Lunch' },
    { id: 2, amount: 30, category: 'Transport', date: '2025-12-01', note: 'Uber' },
    { id: 3, amount: 120, category: 'Shopping', date: '2025-11-30', note: 'Clothes' },
    { id: 4, amount: 80, category: 'Bills', date: '2025-11-29', note: 'Internet' },
  ]);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');

  const addExpense = () => {
    if (!amount) return;
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
      note
    };
    setExpenses([...expenses, newExpense]);
    setAmount(''); setNote('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Pie chart data
  const pieData = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'].map(cat => ({
    name: cat,
    value: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
  })).filter(d => d.value > 0);

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', background: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Your Expenses Dashboard</h1>
      <h2 style={{ textAlign: 'center', color: '#27ae60' }}>Total Spent: ₹{total.toFixed(2)}</h2>

      {/* Add new expense */}
      <div style={{ textAlign: 'center', margin: '20px', padding: '20px', background: 'white', borderRadius: '12px' }}>
        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} style={inputStyle} />
        <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
          <option>Food</option><option>Transport</option><option>Shopping</option><option>Bills</option><option>Other</option>
        </select>
        <input placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} style={inputStyle} />
        <button onClick={addExpense} style={greenButton}>Add Expense</button>
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', margin: '30px 0' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ textAlign: 'center' }}>By Category</h3>
          <PieChart width={350} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* List */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {expenses.map(exp => (
          <div key={exp.id} style={{ background: 'white', padding: '15px', margin: '10px 0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>₹{exp.amount}</strong> - {exp.category} <small>({exp.date})</small>
              {exp.note && <span> → {exp.note}</span>}
            </div>
            <button onClick={() => deleteExpense(exp.id)} style={redButton}>Delete</button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} style={logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

const inputStyle = { padding: '12px', margin: '8px', borderRadius: '8px', border: '1px solid #ddd', width: '150px' };
const greenButton = { padding: '12px 30px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const redButton = { padding: '8px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' };
const logoutButton = { padding: '14px 40px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };

export default Dashboard;