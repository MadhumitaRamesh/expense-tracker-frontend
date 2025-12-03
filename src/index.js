import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // optional

const root = createRoot(document.getElementById('root'));
root.render(<App />);

