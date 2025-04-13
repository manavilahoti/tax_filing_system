import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import IncomeTaxCalculator from './pages/incometaxcalculator/IncomeTaxCalculator';
import TaxSlabs from './pages/TaxSlab';
import DocsUpload from './pages/DocsUpload';
import ITRFiling from './pages/ITRfiling/ITRFiling';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/income-tax" element={<IncomeTaxCalculator />} />
          <Route path="/tax-slabs" element={<TaxSlabs />} />
          <Route path="/docs-upload" element={<DocsUpload />} />
          <Route path="/ITR-filing" element={<ITRFiling />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;