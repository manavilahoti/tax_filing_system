import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step5TaxSummary = () => {
  const { watch } = useFormContext();

  const salary = watch('salary') || 0;
  const hra = watch('hra') || 0;
  const basicSalary = watch('basicSalary') || 0;
  const section80C = watch('section80C') || 0;
  const section80D = watch('section80D') || 0;
  const tds = watch('tds') || 0;

  const totalIncome = salary - (section80C + section80D);
  const taxPayable = calculateTax(totalIncome);
  const balanceTax = Math.max(0, taxPayable - tds);

  function calculateTax(income) {
    if (income <= 500000) return 0;
    if (income <= 1000000) return (income - 500000) * 0.2;
    return 100000 + (income - 1000000) * 0.3;
  }

  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Tax Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">Income Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Gross Salary:</span>
              <span>₹{salary.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Basic Salary:</span>
              <span>₹{basicSalary.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>HRA:</span>
              <span>₹{hra.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium mb-2">Deductions</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Section 80C:</span>
              <span>₹{section80C.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Section 80D:</span>
              <span>₹{section80D.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-medium border-t pt-2">
              <span>Total Deductions:</span>
              <span>₹{(section80C + section80D).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-medium mb-2">Tax Liability</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Taxable Income:</span>
            <span>₹{totalIncome.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax Payable:</span>
            <span className="font-bold">₹{taxPayable.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span>TDS Deducted:</span>
            <span>₹{tds.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Balance Tax:</span>
            <span>₹{balanceTax.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5TaxSummary;