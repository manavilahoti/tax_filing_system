import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step4TaxSavings = ({ autoFilledFields = [] }) => {
  const { register, watch } = useFormContext();
  const section80CValue = watch('section80C');
  const section80DValue = watch('section80D');

  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Tax Savings & Deductions</h2>
      
      {autoFilledFields.some(f => f.startsWith('section')) && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            Some deductions have been auto-filled from Form 16
          </p>
        </div>
      )}

      <div className="mb-4 p-4 bg-green-50 rounded-lg">
        <h3 className="font-medium mb-2">Section 80C (₹1.5L limit)</h3>
        <input
          type="number"
          {...register('section80C', { max: 150000 })}
          className={`w-full p-2 border rounded ${
            autoFilledFields.includes('section80C') ? 'bg-green-50' : ''
          }`}
        />
        {autoFilledFields.includes('section80C') && (
          <p className="text-xs text-green-600 mt-1">
            Auto-filled: ₹{section80CValue?.toLocaleString('en-IN')}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">EPF, LIC, PPF, ELSS, etc.</p>
      </div>

      <div className="mb-4 p-4 bg-green-50 rounded-lg">
        <h3 className="font-medium mb-2">Section 80D (Health Insurance)</h3>
        <input
          type="number"
          {...register('section80D')}
          className={`w-full p-2 border rounded ${
            autoFilledFields.includes('section80D') ? 'bg-green-50' : ''
          }`}
        />
        {autoFilledFields.includes('section80D') && (
          <p className="text-xs text-green-600 mt-1">
            Auto-filled: ₹{section80DValue?.toLocaleString('en-IN')}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step4TaxSavings;