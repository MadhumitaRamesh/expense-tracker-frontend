import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'; // For charts

function Dashboard() {
  const [expenses, setExpenses] = useState([]); // List of expenses
  const [amount, setAmount] = useState(''); // New expense amount
  const [category, setCategory] = useState('Food'); // New category
  const [date, setDate] = useState(''); // New date
  const [note, setNote] = useState(''); // New note

  useEffect(() => { // Run when page loads
    fetchExpenses(); // Get expenses from backend
  }, []);

  const fetchExpenses = async () => {
    const token = localStorage.getItem('token'); // Get JWT token (boss's authorisation)
    try {
      const response = await axios.get('http://localhost:8080/api/expenses', { headers: { Authorization: `Bearer ${token}` } }); // Send token
      setExpenses(response.data); // Save expenses
    } catch (error) {
      alert('Error getting expenses — check login');
    }
  };

  const addExpense = async () => {
    const token = localStorage.getItem('token');
    const data = { amount, category, date, note }; // Data to send
    // Boss's payload encryption: we'll add AES here later, for now plain
    try {
      await axios.post('http://localhost:8080/api/expenses', data, { headers: { Authorization: `Bearer ${token}` } });
      setAmount(''); setCategory('Food'); setDate(''); setNote(''); // Clear boxes
      fetchExpenses(); // Refresh list
    } catch (error) {
      alert('Error adding expense');
    }
  };

  const deleteExpense = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchExpenses();
    } catch (error) {
      alert('Error deleting');
    }
  };

  const updateExpense = async (id, newAmount) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:8080/api/expenses/${id}`, { amount: newAmount }, { headers: { Authorization: `Bearer ${token}` } });
      fetchExpenses();
    } catch (error) {
      alert('Error editing');
    }
  };

  // Total spent (sum amounts)
  const totalSpent = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  // Pie chart data (group by category)
  const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];
  const pieData = categories.map(cat => ({
    name: cat,
    value: expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
  })).filter(d => d.value > 0);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Bar chart (last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();
  const barData = last7Days.map(day => ({
    name: day,
    spent: expenses.filter(exp => exp.date === day).reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
  }));

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Expense Dashboard</h1>
      <h2>Total Spent: ${totalSpent.toFixed(2)}</h2>

      {/* Add form */}
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" style={inputStyle} />
      <select value= {category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
        <option>Food</option><option>Transport</option><option>Bills</option><option>Shopping</option><option>Other</option>
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
      <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" style={inputStyle} />
      <button onClick={addExpense} style={buttonStyle}>Add Expense</button>

      {/* List */}
      <ul style={{ listStyle: 'none' }}>
        {expenses.map(exp => (
          <li key={exp.id} style={{ margin: '10px' }}>
            ${exp.amount} - {exp.category} on {exp.date} ({exp.note})
            <button onClick={() => deleteExpense(exp.id)} style={{ marginLeft: '10px', background: 'red' }}>Delete</button>
            <button onClick={() => { const newAmt = prompt('New amount', exp.amount); if (newAmt) updateExpense(exp.id, newAmt); }} style={{ marginLeft: '10px', background: 'orange' }}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Pie Chart */}
      <h3>By Category</h3>
      <PieChart width={300} height= {300}>
        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Bar Chart */}
      <h3>Last 7 Days</h3>
      <BarChart width={300} height= {200} data={barData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="spent" fill="#8884d8" />
      </BarChart>

      <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} style={buttonStyle}>Logout</button>
    </div>
  );
}

const inputStyle = { margin: '5px', padding: '10px' };
const buttonStyle = { padding: '10px 20px', margin: '10px', background: 'green', color: 'white' };

export default Dashboard;