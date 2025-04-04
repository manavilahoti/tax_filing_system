import React, { useState } from 'react';

const IncomeDetails = ({ onNext, onBack }) => {
  const [income, setIncome] = useState({
    salary: '',
    interest: '',
    rental: '',
    capitalGains: '',
    other: ''
  });

  const handleChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(income);
  };

  return (
    <div className="tax-form-section">
      <h2>Income Details</h2>
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <td><label>Income from Salary</label></td>
              <td>
                <input
                  type="number"
                  name="salary"
                  value={income.salary}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Income from Interest</label></td>
              <td>
                <input
                  type="number"
                  name="interest"
                  value={income.interest}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><label>Rental Income</label></td>
              <td>
                <input
                  type="number"
                  name="rental"
                  value={income.rental}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-actions">
          <button type="button" onClick={onBack} className="btn-back">Back</button>
          <button type="submit" className="btn-next">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default IncomeDetails;