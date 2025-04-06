import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const calculateTax = (formData, regime) => {
  // Calculate total income
  const totalIncome = 
    parseFloat(formData.salary || 0) +
    parseFloat(formData.houseProperty || 0) +
    parseFloat(formData.capitalGains || 0) +
    parseFloat(formData.otherSources || 0) +
    parseFloat(formData.businessProfession || 0);
  
  // Calculate deductions based on regime
  let totalDeductions = 0;
  let taxableIncome = totalIncome;
  
  if (regime === 'old') {
    totalDeductions = 
      Math.min(parseFloat(formData.section80C || 0), 150000) +
      Math.min(parseFloat(formData.section80D || 0), 75000) +
      parseFloat(formData.section80G || 0) +
      parseFloat(formData.section80E || 0) +
      Math.min(parseFloat(formData.section24 || 0), 200000) +
      parseFloat(formData.otherDeductions || 0);
    
    taxableIncome = Math.max(0, totalIncome - totalDeductions);
  } else {
    // New regime has limited deductions
    taxableIncome = totalIncome;
  }
  
  // Calculate tax based on slabs
  let tax = 0;
  if (regime === 'old') {
    // Old regime tax calculation
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 12500 + (taxableIncome - 500000) * 0.2;
    } else {
      tax = 112500 + (taxableIncome - 1000000) * 0.3;
    }
  } else {
    // New regime tax calculation
    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 750000) {
      tax = 12500 + (taxableIncome - 500000) * 0.1;
    } else if (taxableIncome <= 1000000) {
      tax = 37500 + (taxableIncome - 750000) * 0.15;
    } else if (taxableIncome <= 1250000) {
      tax = 75000 + (taxableIncome - 1000000) * 0.2;
    } else if (taxableIncome <= 1500000) {
      tax = 125000 + (taxableIncome - 1250000) * 0.25;
    } else {
      tax = 187500 + (taxableIncome - 1500000) * 0.3;
    }
  }
  
  // Add 4% health and education cess
  tax += tax * 0.04;
  
  return {
    totalIncome,
    totalDeductions,
    taxableIncome,
    tax: Math.round(tax),
  };
};

const TaxSummary = ({ formData }) => {
  const oldRegime = calculateTax(formData, 'old');
  const newRegime = calculateTax(formData, 'new');
  
  const barChartData = {
    labels: ['Total Income', 'Taxable Income', 'Deductions', 'Tax Payable'],
    datasets: [
      {
        label: 'Old Regime',
        data: [oldRegime.totalIncome, oldRegime.taxableIncome, oldRegime.totalDeductions, oldRegime.tax],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'New Regime',
        data: [newRegime.totalIncome, newRegime.taxableIncome, newRegime.totalDeductions, newRegime.tax],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tax Comparison (Old vs New Regime)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString('en-IN');
          },
        },
      },
    },
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-700">Tax Summary</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="h-80">
          <Bar data={barChartData} options={options} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800 mb-4">Old Tax Regime</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Income:</span>
              <span className="font-medium">₹{oldRegime.totalIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Total Deductions:</span>
              <span className="font-medium">₹{oldRegime.totalDeductions.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Taxable Income:</span>
              <span className="font-medium">₹{oldRegime.taxableIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-700 font-semibold">Tax Payable:</span>
              <span className="font-bold text-blue-800">₹{oldRegime.tax.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="text-lg font-medium text-red-800 mb-4">New Tax Regime</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Income:</span>
              <span className="font-medium">₹{newRegime.totalIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Total Deductions:</span>
              <span className="font-medium">₹{newRegime.totalDeductions.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Taxable Income:</span>
              <span className="font-medium">₹{newRegime.taxableIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-700 font-semibold">Tax Payable:</span>
              <span className="font-bold text-red-800">₹{newRegime.tax.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">Recommendation</h3>
        <p className="text-gray-700">
          Based on your income and deductions, the{' '}
          <span className={`font-bold ${oldRegime.tax < newRegime.tax ? 'text-blue-800' : 'text-red-800'}`}>
            {oldRegime.tax < newRegime.tax ? 'Old Regime' : 'New Regime'}
          </span>{' '}
          is more beneficial for you. You can save{' '}
          <span className="font-bold">
            ₹{Math.abs(oldRegime.tax - newRegime.tax).toLocaleString('en-IN')}
          </span>{' '}
          by choosing the {oldRegime.tax < newRegime.tax ? 'Old' : 'New'} Regime.
        </p>
      </div>
    </div>
  );
};

export default TaxSummary;