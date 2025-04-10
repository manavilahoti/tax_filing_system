import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import BasicDetails from './BasicDetails';
import IncomeDetails from './IncomeDetails';
import Deductions from './Deductions';
import TaxSummary from './TaxSummary';

const IncomeTaxCalculator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    residentialStatus: 'resident',
    salary: 0,
    houseProperty: 0,
    capitalGains: 0,
    otherSources: 0,
    businessProfession: 0,
    section80C: 0,
    section80D: 0,
    section80G: 0,
    section80E: 0,
    section24: 0,
    otherDeductions: 0,
    regime: 'new',
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (activeTab === 'basic') setActiveTab('income');
    else if (activeTab === 'income') setActiveTab('deductions');
    else if (activeTab === 'deductions') setActiveTab('summary');
  };

  const handleBack = () => {
    if (activeTab === 'income') setActiveTab('basic');
    else if (activeTab === 'deductions') setActiveTab('income');
    else if (activeTab === 'summary') setActiveTab('deductions');
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Income Tax Calculator</h1>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div 
              className={`bg-blue-600 h-2.5 rounded-full ${activeTab === 'basic' ? 'w-1/4' : activeTab === 'income' ? 'w-2/4' : activeTab === 'deductions' ? 'w-3/4' : 'w-full'}`}
            ></div>
          </div>
          
          <div className="flex mb-6 border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'basic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Details
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'income' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('income')}
              disabled={!formData.name || !formData.age}
            >
              Income Details
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'deductions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('deductions')}
              disabled={!formData.salary}
            >
              Deductions
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('summary')}
              disabled={!formData.section80C}
            >
              Summary
            </button>
          </div>
          
          <div className="p-4">
            {activeTab === 'basic' && (
              <BasicDetails formData={formData} handleChange={handleChange} />
            )}
            {activeTab === 'income' && (
              <IncomeDetails formData={formData} handleChange={handleChange} />
            )}
            {activeTab === 'deductions' && (
              <Deductions formData={formData} handleChange={handleChange} />
            )}
            {activeTab === 'summary' && (
              <TaxSummary formData={formData} />
            )}
          </div>
          
          <div className="flex justify-between mt-6">
            {activeTab !== 'basic' && (
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Back
              </button>
            )}
            {activeTab !== 'summary' ? (
              <button
                onClick={handleNext}
                className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                  (activeTab === 'basic' && (!formData.name || !formData.age)) ||
                  (activeTab === 'income' && !formData.salary)
                ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={
                  (activeTab === 'basic' && (!formData.name || !formData.age)) ||
                  (activeTab === 'income' && !formData.salary)
                }
              >
                Next
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxCalculator;