import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import './Dashboard.css';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const user = {
    name: 'John Doe',
    filingStatus: 'In Progress',
    upcomingDeadline: '15th April 2025'
  };

  return (
    <div className={`dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {user.name}</h1>
            <div className="status-info">
              <div className="status-item">
                <span>Your tax filing status:</span>
                <span className="status-badge">{user.filingStatus}</span>
              </div>
              <div className="status-item">
                <span>Upcoming deadline:</span>
                <span className="deadline">{user.upcomingDeadline}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-body">
          <div className="dashboard-card">
            <div className="card-content">
              <h2>Income Tax Calculator</h2>
              <p>Estimate your tax liability for the year</p>
              <div className="button-container">
                <Link to="/income-tax" className="card-button">Go to Calculator</Link>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <h2>Upload Documents</h2>
              <p>Submit your tax documents securely</p>
              <div className="button-container">
                <Link to="/upload" className="card-button">Upload Documents</Link>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <h2>File Your ITR</h2>
              <p>Complete and submit your income tax return</p>
              <div className="button-container">
                <Link to="/itr" className="card-button">File ITR</Link>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-content">
              <h2>Consult with Tax Expert</h2>
              <p>Get professional advice for your taxes</p>
              <div className="button-container">
                <Link to="/consult" className="card-button">Consult Now</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;