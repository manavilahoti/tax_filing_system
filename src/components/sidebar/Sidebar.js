import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaCalculator, FaFileUpload, FaFileInvoice, FaUserAlt, FaSlidersH, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className={`user-profile ${isSidebarOpen ? 'show' : 'hide'}`}>
          <h1>John Doe</h1>
          <p>Tax Payer</p>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">
              <FaHome className="nav-icon" />
              <span className={isSidebarOpen ? 'show' : 'hide'}>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/income-tax">
              <FaCalculator className="nav-icon" />
              <span className={isSidebarOpen ? 'show' : 'hide'}>Income Tax Calculator</span>
            </Link>
          </li>
          <li>
            <Link to="/upload">
              <FaFileUpload className="nav-icon" />
              <span className={isSidebarOpen ? 'show' : 'hide'}>Upload Documents</span>
            </Link>
          </li>
          <li>
            <Link to="/itr">
              <FaFileInvoice className="nav-icon" />
              <span className={isSidebarOpen ? 'show' : 'hide'}>File ITR</span>
            </Link>
          </li>
          <li>
            <Link to="/consult">
              <FaUserAlt className="nav-icon" />
              <span className={isSidebarOpen ? 'show' : 'hide'}>Consult with Tax Expert</span>
            </Link>
          </li>
          <li>
            <Link to="/tax-slabs">
              <FaSlidersH className="nav-icon" />
              <span className={isSidebarOpen ? 'show' : 'hide'}>Tax Slabs</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link to="/logout">
          <FaSignOutAlt className="nav-icon" />
          <span className={isSidebarOpen ? 'show' : 'hide'}>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;