import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import './TaxSlab.css';

const TaxSlabs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const taxData = {
    oldRegime: {
      description: "With deductions (80C, HRA, 80D, etc.)",
      slabs: [
        { min: 0, max: 300000, rate: 0, description: "No tax" },
        { min: 300001, max: 600000, rate: 5, description: "5% of amount exceeding ₹3L" },
        { min: 600001, max: 1200000, rate: 20, description: "₹15,000 + 20% of amount exceeding ₹6L" },
        { min: 1200001, max: null, rate: 30, description: "₹1,35,000 + 30% of amount exceeding ₹12L" }
      ],
      rebate: {
        underSection87A: {
          maxIncome: 700000,
          maxDeduction: 25000,
          description: "Full tax rebate up to ₹25,000 for income below ₹7L"
        }
      },
      cess: {
        rate: 4,
        description: "Health & Education Cess (4% of total tax + surcharge)"
      }
    },
    newRegime: {
      description: "Default regime (lower rates but fewer deductions)",
      slabs: [
        { min: 0, max: 350000, rate: 0, description: "No tax" },
        { min: 350001, max: 700000, rate: 5, description: "5% of amount exceeding ₹3.5L" },
        { min: 700001, max: 1000000, rate: 10, description: "₹17,500 + 10% of amount exceeding ₹7L" },
        { min: 1000001, max: 1400000, rate: 15, description: "₹47,500 + 15% of amount exceeding ₹10L" },
        { min: 1400001, max: 1800000, rate: 20, description: "₹1,07,500 + 20% of amount exceeding ₹14L" },
        { min: 1800001, max: null, rate: 30, description: "₹1,87,500 + 30% of amount exceeding ₹18L" }
      ],
      rebate: {
        underSection87A: {
          maxIncome: 750000,
          maxDeduction: 30000,
          description: "Full tax rebate up to ₹30,000 for income below ₹7.5L"
        }
      },
      cess: {
        rate: 4,
        description: "Health & Education Cess (4% of total tax + surcharge)"
      }
    },
    surcharge: {
      description: "Additional tax on high income earners",
      rates: [
        { min: 5000000, max: 10000000, rate: 10, description: "10% of tax amount" },
        { min: 10000001, max: 20000000, rate: 15, description: "15% of tax amount" },
        { min: 20000001, max: 50000000, rate: 25, description: "25% of tax amount" },
        { min: 50000001, max: null, rate: 37, description: "37% of tax amount" }
      ]
    }
  };

  const formatRange = (min, max) => {
    if (max === null) return `Above ₹${formatCurrency(min)}`;
    return `₹${formatCurrency(min)} - ₹${formatCurrency(max)}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-gray-50">
      
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="tax-slabs-container p-6">
          <div className="header-section">
            <h1 className="main-heading">Income Tax Slabs & Rates (FY 2025-26)</h1>
            <p className="subheading">Compare tax liability under both regimes</p>
          </div>

          <div className="regime-tabs">
            <div className="regime-section">
              <h2 className="regime-heading old-regime">Old Tax Regime</h2>
              <p className="regime-description">{taxData.oldRegime.description}</p>
              
              <div className="tax-table-container">
                <table className="tax-table">
                  <thead>
                    <tr>
                      <th className="text-left">Income Slab</th>
                      <th className="text-center">Tax Rate</th>
                      <th className="text-left">Tax Calculation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxData.oldRegime.slabs.map((slab, index) => (
                      <tr key={`old-slab-${index}`}>
                        <td className="text-left">{formatRange(slab.min, slab.max)}</td>
                        <td className="text-center">{slab.rate}%</td>
                        <td className="text-left">{slab.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="additional-info">
                <h3 className="info-heading">Rebate under Section 87A</h3>
                <p className="text-justify">{taxData.oldRegime.rebate.underSection87A.description}</p>
                
                <h3 className="info-heading">Cess</h3>
                <p className="text-justify">{taxData.oldRegime.cess.description}</p>
              </div>
            </div>

            <div className="regime-section">
              <h2 className="regime-heading new-regime">New Tax Regime</h2>
              <p className="regime-description">{taxData.newRegime.description}</p>
              
              <div className="tax-table-container">
                <table className="tax-table">
                  <thead>
                    <tr>
                      <th className="text-left">Income Slab</th>
                      <th className="text-center">Tax Rate</th>
                      <th className="text-left">Tax Calculation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxData.newRegime.slabs.map((slab, index) => (
                      <tr key={`new-slab-${index}`}>
                        <td className="text-left">{formatRange(slab.min, slab.max)}</td>
                        <td className="text-center">{slab.rate}%</td>
                        <td className="text-left">{slab.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="additional-info">
                <h3 className="info-heading">Rebate under Section 87A</h3>
                <p className="text-justify">{taxData.newRegime.rebate.underSection87A.description}</p>
                
                <h3 className="info-heading">Cess</h3>
                <p className="text-justify">{taxData.newRegime.cess.description}</p>
              </div>
            </div>
          </div>

          <div className="surcharge-section">
            <h2 className="section-heading">Surcharge Rates</h2>
            <p className="section-description">{taxData.surcharge.description}</p>
            
            <div className="surcharge-table-container">
              <table className="surcharge-table">
                <thead>
                  <tr>
                    <th className="text-left">Income Range</th>
                    <th className="text-center">Surcharge Rate</th>
                    <th className="text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {taxData.surcharge.rates.map((rate, index) => (
                    <tr key={`surcharge-${index}`}>
                      <td className="text-left">{formatRange(rate.min, rate.max)}</td>
                      <td className="text-center">{rate.rate}%</td>
                      <td className="text-left">{rate.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="notes-section">
            <h3 className="notes-heading">Important Notes:</h3>
            <ul className="notes-list">
              <li>Tax rates are subject to change as per Union Budget announcements</li>
              <li>Marginal Relief may be available in some surcharge cases</li>
              <li>Professional tax (if applicable) is not included in these calculations</li>
              <li>These rates are projected for FY 2025-26 and may change</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSlabs;