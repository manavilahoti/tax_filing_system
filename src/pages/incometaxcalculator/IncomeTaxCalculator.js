// src/pages/IncomeTaxCalculator.js
import React, { useState } from 'react';
import BasicDetails from './BasicDetails';  // Default import
import IncomeDetails from './IncomeDetails';  // Default import
import Deductions from './Deductions';  // Default import
import TaxSummary from './TaxSummary';  // Default import

const IncomeTaxCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  return (
    <div className="calculator">
      <h1>Income Tax Calculator</h1>
      <div className="form">
        {step === 1 && <BasicDetails onNext={nextStep} />}
        {step === 2 && <IncomeDetails onNext={nextStep} />}
        {step === 3 && <Deductions onNext={nextStep} />}
        {step === 4 && <TaxSummary data={formData} />}
      </div>
    </div>
  );
}

export default IncomeTaxCalculator;
