import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  FaTachometerAlt, FaBox, FaClipboardList } from "react-icons/fa";

function Dashboard() {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <h4 className="text-white">Administration</h4>
        <ul className="list-unstyled">
          <li>
            <Link to="/dashboard" className="text-white text-decoration-none d-flex align-items-center p-2">
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>
          <li>
            <div 
              className="text-white d-flex align-items-center p-2 cursor-pointer"
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              style={{ cursor: "pointer" }}
            >
              <FaBox className="me-2" /> Catalog <span className="ms-auto">{isCatalogOpen ? "▼" : "▶"}</span>
            </div>
            {isCatalogOpen && (
              <ul className="list-unstyled ms-4">
                <li>
                  <Link to="/categories" className="text-white text-decoration-none d-block p-2">
                    <FaClipboardList className="me-2" /> Categories
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-white text-decoration-none d-block p-2">
                    <FaBox className="me-2" /> Product
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-4" style={{ flex: 1 }}>
        <h2>Dashboard</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="bg-primary text-white p-4 rounded">
              <h5>Total Orders</h5>
              <h3>757</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-success text-white p-4 rounded">
              <h5>Total Sales</h5>
              <h3>146.9K</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-info text-white p-4 rounded">
              <h5>Total Customers</h5>
              <h3>900</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-warning text-white p-4 rounded">
              <h5>People Online</h5>
              <h3>7</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
