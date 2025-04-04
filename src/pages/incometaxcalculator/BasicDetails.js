import React, { useState } from 'react';

const TaxCalculatorForm = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    financialYear: 'FY 2025-2026',
    ageGroup: '0-60',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="tax-form-section">
      <h1 className="form-title">Recalculate</h1>
      
      <div className="form-tabs">
        <div 
          className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic details
        </div>
        <div 
          className={`tab ${activeTab === 'income' ? 'active' : ''}`}
          onClick={() => setActiveTab('income')}
        >
          Income details
        </div>
        <div 
          className={`tab ${activeTab === 'deduction' ? 'active' : ''}`}
          onClick={() => setActiveTab('deduction')}
        >
          Deduction
        </div>
      </div>

      <form onSubmit={handleSubmit} className="tax-form">
        {activeTab === 'basic' && (
          <div className="form-table">
            <div className="form-row">
              <label className="form-label">Financial year</label>
              <select
                name="financialYear"
                value={formData.financialYear}
                onChange={handleChange}
                className="form-select"
              >
                <option value="FY 2025-2026">
                  FY 2025–2026 (Return to be filed between 1st April 2026 – 31st March 2026)
                </option>
                <option value="FY 2024-2025">
                  FY 2024–2025 (Return to be filed between 1st April 2025 – 31st December 2025)
                </option>
              </select>
            </div>

            <div className="form-row">
              <label className="form-label">Age group</label>
              <select
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleChange}
                className="form-select"
              >
                <option value="0-60">0-60 years</option>
                <option value="60+">60+ years</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'income' && (
          <div className="form-table">
            <p className="coming-soon">Income details section coming soon</p>
          </div>
        )}

        {activeTab === 'deduction' && (
          <div className="form-table">
            <p className="coming-soon">Deduction section coming soon</p>
          </div>
        )}

        <div className="form-button-container">
          <button type="submit" className="btn-primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaxCalculatorForm;