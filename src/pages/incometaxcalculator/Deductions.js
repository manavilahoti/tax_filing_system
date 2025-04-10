import React from 'react';

const Deductions = ({ formData, handleChange }) => {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="flex flex-col p-6">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Deductions</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section 80C (PPF, ELSS, etc.) (₹)</label>
                  <input
                    type="number"
                    name="section80C"
                    value={formData.section80C}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    max="150000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max limit: ₹1,50,000</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section 80D (Health Insurance) (₹)</label>
                  <input
                    type="number"
                    name="section80D"
                    value={formData.section80D}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    max="75000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max limit: ₹75,000</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section 80G (Donations) (₹)</label>
                  <input
                    type="number"
                    name="section80G"
                    value={formData.section80G}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section 80E (Education Loan) (₹)</label>
                  <input
                    type="number"
                    name="section80E"
                    value={formData.section80E}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section 24 (Home Loan Interest) (₹)</label>
                  <input
                    type="number"
                    name="section24"
                    value={formData.section24}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    max="200000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max limit: ₹2,00,000</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Other Deductions (₹)</label>
                  <input
                    type="number"
                    name="otherDeductions"
                    value={formData.otherDeductions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="inline-flex items-center mr-6">
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
                <label className="inline-flex items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deductions;