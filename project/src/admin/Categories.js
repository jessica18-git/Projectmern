import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFileCsv, FaFilePdf, FaFileExcel, FaTachometerAlt, FaBox, FaClipboardList } from "react-icons/fa";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [status, setStatus] = useState("Enabled");
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    axios.get("http://localhost:8000/api/orders")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainCategory.trim() || !subCategory.trim()) return;

    const newCategory = { mainCategory, subCategory, status };

    try {
      const response = await axios.post("http://localhost:8000/api/orders", newCategory);
      setCategories([...categories, response.data]);
      setMainCategory("");
      setSubCategory("");
      setStatus("Enabled");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/orders/${id}`)
      .then(() => {
        setCategories(categories.filter(cat => cat._id !== id)); // Use _id instead of id
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  // Handle view
  const handleView = (category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  // Handle edit
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/orders/${selectedCategory._id}`, selectedCategory); // Use _id
      setCategories(categories.map(cat => cat._id === selectedCategory._id ? response.data : cat)); // Use _id
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Category List", 20, 10);
    doc.autoTable({
      head: [["S.No", "Main Category", "Sub Category", "Status"]],
      body: categories.map((cat, index) => [index + 1, cat.mainCategory, cat.subCategory, cat.status]),
    });
    doc.save("categories.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(categories);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
    XLSX.writeFile(workbook, "categories.xlsx");
  };

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
      <div className="container mt-4">
        <h3>Categories</h3>

        {/* Category Form */}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Main category"
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Sub category"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>

        {/* Export Buttons */}
        <div className="mt-3">
          <CSVLink data={categories} filename={"categories.csv"} className="btn btn-success me-2">
            <FaFileCsv /> Export to CSV
          </CSVLink>
          <button className="btn btn-danger me-2" onClick={exportToPDF}>
            <FaFilePdf /> Export to PDF
          </button>
          <button className="btn btn-primary" onClick={exportToExcel}>
            <FaFileExcel /> Export to Excel
          </button>
        </div>

        {/* Category List Table */}
        <div className="mt-4">
          <h5>Category List</h5>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th><input type="checkbox" /></th>
                <th>S.No</th>
                <th>Main Category</th>
                <th>Sub Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <tr key={cat._id}> {/* Use _id instead of id */}
                    <td><input type="checkbox" /></td>
                    <td>{index + 1}</td>
                    <td>{cat.mainCategory}</td>
                    <td>{cat.subCategory}</td>
                    <td>{cat.status}</td>
                    <td>
                      <button className="btn btn-info btn-sm me-2" onClick={() => handleView(cat)}>View</button>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(cat)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat._id)}>Delete</button> {/* Use _id */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No Categories Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Category Details</h5>
                <button type="button" className="btn-close" onClick={() => setIsViewModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Main Category:</strong> {selectedCategory.mainCategory}</p>
                <p><strong>Sub Category:</strong> {selectedCategory.subCategory}</p>
                <p><strong>Status:</strong> {selectedCategory.status}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsViewModalOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label className="form-label">Main Category</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCategory.mainCategory}
                      onChange={(e) => setSelectedCategory({ ...selectedCategory, mainCategory: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Sub Category</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCategory.subCategory}
                      onChange={(e) => setSelectedCategory({ ...selectedCategory, subCategory: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={selectedCategory.status}
                      onChange={(e) => setSelectedCategory({ ...selectedCategory, status: e.target.value })}
                    >
                      <option value="Enabled">Enabled</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;