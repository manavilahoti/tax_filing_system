import React from 'react';

const TaxSummary = ({ data, onRestart }) => {
  // Tax calculation logic
  const calculateTax = () => {
    const { ageGroup, salary = 0, interest = 0, rental = 0, section80C = 0, section80D = 0 } = data;
    const grossIncome = parseFloat(salary) + parseFloat(interest) + parseFloat(rental);
    const totalDeductions = Math.min(parseFloat(section80C), 150000) + parseFloat(section80D);
    const taxableIncome = grossIncome - totalDeductions;

    let tax = 0;
    
    if (ageGroup === 'below-60') {
      if (taxableIncome > 1000000) {
        tax = 112500 + (taxableIncome - 1000000) * 0.3;
      } else if (taxableIncome > 500000) {
        tax = 12500 + (taxableIncome - 500000) * 0.2;
      } else if (taxableIncome > 250000) {
        tax = (taxableIncome - 250000) * 0.05;
      }
    }
    // Add other age groups...

    const cess = tax * 0.04;
    return {
      grossIncome,
      totalDeductions,
      taxableIncome,
      tax,
      cess,
      totalTax: tax + cess
    };
  };

  const results = calculateTax();

  return (
    <div className="tax-summary">
      <h2>Tax Calculation Summary</h2>
      
      <table className="results-table">
        <tbody>
          <tr>
            <th>Gross Income</th>
            <td>₹{results.grossIncome.toLocaleString()}</td>
          </tr>
          <tr>
            <th>Total Deductions</th>
            <td>₹{results.totalDeductions.toLocaleString()}</td>
          </tr>
          <tr>
            <th>Taxable Income</th>
            <td>₹{results.taxableIncome.toLocaleString()}</td>
          </tr>
          <tr className="tax-row">
            <th>Income Tax</th>
            <td>₹{results.tax.toLocaleString()}</td>
          </tr>
          <tr>
            <th>Health & Education Cess (4%)</th>
            <td>₹{results.cess.toLocaleString()}</td>
          </tr>
          <tr className="total-row">
            <th>Total Tax Liability</th>
            <td>₹{results.totalTax.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={onRestart} className="btn-restart">Calculate Again</button>
    </div>
  );
};

export default TaxSummary;