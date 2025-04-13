import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step3IncomeSources = ({ autoFilledFields = [] }) => {
  const { register, watch } = useFormContext();
  const salaryValue = watch('salary');
  const hraValue = watch('hra');
  const basicSalaryValue = watch('basicSalary');

  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Income Sources</h2>
      
      {autoFilledFields.some(f => ['salary', 'hra', 'basicSalary'].includes(f)) && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Salary information has been auto-filled from Form 16
          </p>
        </div>
      )}

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium mb-2">Salary Income</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Gross Salary (₹)</label>
            <input
              type="number"
              {...register('salary')}
              className={`w-full p-2 border rounded ${
                autoFilledFields.includes('salary') ? 'bg-blue-50' : ''
              }`}
            />
            {autoFilledFields.includes('salary') && (
              <p className="text-xs text-blue-600 mt-1">
                Auto-filled: ₹{salaryValue?.toLocaleString('en-IN')}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Basic Salary (₹)</label>
            <input
              type="number"
              {...register('basicSalary')}
              className={`w-full p-2 border rounded ${
                autoFilledFields.includes('basicSalary') ? 'bg-blue-50' : ''
              }`}
            />
            {autoFilledFields.includes('basicSalary') && (
              <p className="text-xs text-blue-600 mt-1">
                Auto-filled: ₹{basicSalaryValue?.toLocaleString('en-IN')}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">HRA (₹)</label>
            <input
              type="number"
              {...register('hra')}
              className={`w-full p-2 border rounded ${
                autoFilledFields.includes('hra') ? 'bg-blue-50' : ''
              }`}
            />
            {autoFilledFields.includes('hra') && (
              <p className="text-xs text-blue-600 mt-1">
                Auto-filled: ₹{hraValue?.toLocaleString('en-IN')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3IncomeSources;