import React from 'react';

const IncomeDetails = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Income Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary Income (₹)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">House Property Income (₹)</label>
          <input
            type="number"
            name="houseProperty"
            value={formData.houseProperty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capital Gains (₹)</label>
          <input
            type="number"
            name="capitalGains"
            value={formData.capitalGains}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Other Sources Income (₹)</label>
          <input
            type="number"
            name="otherSources"
            value={formData.otherSources}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business/Profession Income (₹)</label>
          <input
            type="number"
            name="businessProfession"
            value={formData.businessProfession}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default IncomeDetails;