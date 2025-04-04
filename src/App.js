// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';  // Correct import for Dashboard
import IncomeTaxCalculator from './pages/incometaxcalculator/IncomeTaxCalculator';  // Ensure the case is correct here
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income-tax" element={<IncomeTaxCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
