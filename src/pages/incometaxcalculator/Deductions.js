import React, { useState } from 'react';

const Deductions = ({ onNext, onBack }) => {
  const [deductions, setDeductions] = useState({
    section80C: '',
    section80D: '',
    section80G: '',
    section80E: ''
  });

  const handleChange = (e) => {
    setDeductions({ ...deductions, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(deductions);
  };

  return (
    <div className="tax-form-section">
      <h2>Deductions</h2>
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <td><label>Section 80C (Max ₹1.5L)</label></td>
              <td>
                <input
                  type="number"
                  name="section80C"
                  value={deductions.section80C}
                  onChange={handleChange}
                  max="150000"
                />
              </td>
            </tr>
            <tr>
              <td><label>Section 80D (Health Insurance)</label></td>
              <td>
                <input
                  type="number"
                  name="section80D"
                  value={deductions.section80D}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-actions">
          <button type="button" onClick={onBack} className="btn-back">Back</button>
          <button type="submit" className="btn-calculate">Calculate Tax</button>
        </div>
      </form>
    </div>
  );
};

export default Deductions;