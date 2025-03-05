import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaClipboardList } from "react-icons/fa";

const AdminLayout = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <h4 className="text-white">Administration</h4>
        <ul className="list-unstyled">
          <li>
            <Link to="/admin/dashboard" className="text-white text-decoration-none d-flex align-items-center p-2">
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>
          <li>
            <div 
              className="text-white d-flex align-items-center p-2"
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              style={{ cursor: "pointer" }}
            >
              <FaBox className="me-2" /> Catalog <span className="ms-auto">{isCatalogOpen ? "▼" : "▶"}</span>
            </div>
            {isCatalogOpen && (
              <ul className="list-unstyled ms-4">
                <li>
                  <Link to="/admin/categories" className="text-white text-decoration-none d-block p-2">
                    <FaClipboardList className="me-2" /> Categories
                  </Link>
                </li>
                <li>
                  <Link to="/admin/products" className="text-white text-decoration-none d-block p-2">
                    <FaBox className="me-2" /> Products
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
