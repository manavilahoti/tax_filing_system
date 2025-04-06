import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import IncomeTaxCalculator from './pages/incometaxcalculator/IncomeTaxCalculator';
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
