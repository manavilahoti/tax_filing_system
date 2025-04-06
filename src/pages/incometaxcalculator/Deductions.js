import React from 'react';
const Deductions = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Deductions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section 80C (PPF, ELSS, etc.) (₹)</label>
          <input
            type="number"
            name="section80C"
            value={formData.section80C}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            max="150000"
          />
          <p className="text-xs text-gray-500 mt-1">Max limit: ₹1,50,000</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section 80D (Health Insurance) (₹)</label>
          <input
            type="number"
            name="section80D"
            value={formData.section80D}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            max="75000"
          />
          <p className="text-xs text-gray-500 mt-1">Max limit: ₹75,000</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section 80G (Donations) (₹)</label>
          <input
            type="number"
            name="section80G"
            value={formData.section80G}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section 80E (Education Loan) (₹)</label>
          <input
            type="number"
            name="section80E"
            value={formData.section80E}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section 24 (Home Loan Interest) (₹)</label>
          <input
            type="number"
            name="section24"
            value={formData.section24}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            max="200000"
          />
          <p className="text-xs text-gray-500 mt-1">Max limit: ₹2,00,000</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Other Deductions (₹)</label>
          <input
            type="number"
            name="otherDeductions"
            value={formData.otherDeductions}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="regime"
            value="old"
            checked={formData.regime === 'old'}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-700">Old Tax Regime</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            name="regime"
            value="new"
            checked={formData.regime === 'new'}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-gray-700">New Tax Regime</span>
        </label>
      </div>
    </div>
  );
};

export default Deductions;