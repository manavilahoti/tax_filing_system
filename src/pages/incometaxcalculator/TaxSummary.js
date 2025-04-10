import React, { useRef } from 'react';
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
  const totalIncome =
    parseFloat(formData.salary || 0) +
    parseFloat(formData.houseProperty || 0) +
    parseFloat(formData.capitalGains || 0) +
    parseFloat(formData.otherSources || 0) +
    parseFloat(formData.businessProfession || 0);

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
    taxableIncome = totalIncome;
  }

  let tax = 0;
  if (regime === 'old') {
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

  tax += tax * 0.04;

  return {
    totalIncome,
    totalDeductions,
    taxableIncome,
    tax: Math.round(tax),
  };
};

const TaxSummary = ({ formData }) => {
  const printRef = useRef();
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
          callback: function (value) {
            return '₹' + value.toLocaleString('en-IN');
          },
        },
      },
    },
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tax Summary</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2 { color: #333; }
            .summary-section { margin-bottom: 30px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .tax-comparison { margin-top: 20px; }
            .recommendation { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <div id="print-content">
            <h1 style="text-align: center; margin-bottom: 30px;">Income Tax Summary</h1>
            
            <div class="summary-section">
              <h2 style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">Basic Details</h2>
              <div class="grid">
                <div>
                  <p><strong>Name:</strong> ${formData.name || 'Not provided'}</p>
                  <p><strong>Age:</strong> ${formData.age || 'Not provided'}</p>
                  <p><strong>Gender:</strong> ${formData.gender || 'Not provided'}</p>
                  <p><strong>Residential Status:</strong> ${formData.residentialStatus === 'nri' ? 'NRI' : 'Resident'}</p>
                </div>
              </div>
            </div>

            <div class="summary-section">
              <h2 style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">Income Details (₹)</h2>
              <div class="grid">
                <p><strong>Salary Income:</strong> ${formData.salary?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>House Property Income:</strong> ${formData.houseProperty?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Capital Gains:</strong> ${formData.capitalGains?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Other Sources Income:</strong> ${formData.otherSources?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Business/Profession Income:</strong> ${formData.businessProfession?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Total Income:</strong> ${oldRegime.totalIncome.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div class="summary-section">
              <h2 style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">Deductions (₹)</h2>
              <div class="grid">
                <p><strong>Section 80C:</strong> ${formData.section80C?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Section 80D:</strong> ${formData.section80D?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Section 80G:</strong> ${formData.section80G?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Section 80E:</strong> ${formData.section80E?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Section 24:</strong> ${formData.section24?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Other Deductions:</strong> ${formData.otherDeductions?.toLocaleString('en-IN') || '0'}</p>
                <p><strong>Total Deductions:</strong> ${oldRegime.totalDeductions.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div class="summary-section tax-comparison">
              <h2 style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">Tax Comparison</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                  <h3 style="margin-bottom: 15px;">Old Tax Regime</h3>
                  <p><strong>Taxable Income:</strong> ₹${oldRegime.taxableIncome.toLocaleString('en-IN')}</p>
                  <p><strong>Tax Payable:</strong> ₹${oldRegime.tax.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <h3 style="margin-bottom: 15px;">New Tax Regime</h3>
                  <p><strong>Taxable Income:</strong> ₹${newRegime.taxableIncome.toLocaleString('en-IN')}</p>
                  <p><strong>Tax Payable:</strong> ₹${newRegime.tax.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            <div class="summary-section recommendation">
              <h2 style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">Recommendation</h2>
              <p>
                The <strong>${oldRegime.tax < newRegime.tax ? 'Old Regime' : 'New Regime'}</strong> is more beneficial for you.
                You can save <strong>₹${Math.abs(oldRegime.tax - newRegime.tax).toLocaleString('en-IN')}</strong> by choosing
                the ${oldRegime.tax < newRegime.tax ? 'Old' : 'New'} Regime.
              </p>
            </div>

            <div style="margin-top: 40px; font-size: 0.8em; color: #666;">
              <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="bg-gray-50 p-6" ref={printRef}>
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800">Tax Summary</h2>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-80">
            <Bar data={barChartData} options={options} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
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

          <div className="bg-red-50 p-6 rounded-lg border border-red-200 shadow-sm">
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

        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
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

        <div className="flex justify-end">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Print Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxSummary;