import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CSVLink } from "react-csv";
import { FaTachometerAlt, FaBox, FaClipboardList, FaFileCsv, FaFilePdf, FaFileExcel, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import "./product.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [formData, setFormData] = useState({
    mainCategory: "",
    subCategory: "",
    price: "",
    quantity: "",
    status: "",
    image: null,
  });
  const [selectedProduct, setSelectedProduct] = useState(null); // For View Popup
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For Edit Modal
  const [editFormData, setEditFormData] = useState({ // For Edit Form
    _id: "",
    mainCategory: "",
    subCategory: "",
    price: "",
    quantity: "",
    status: "",
    image: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All"); // For Filter
  const [searchQuery, setSearchQuery] = useState(""); // For Search
  const itemsPerPage = 5;

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort by creation date (newest first)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle input change for Add Product Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file change for Add Product Form
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submit (Add Product)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("mainCategory", formData.mainCategory);
    formDataToSend.append("subCategory", formData.subCategory);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post("http://localhost:8000/api/products/add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data) {
        setProducts((prevProducts) => [response.data, ...prevProducts]); // Append new product at the top
      }

      // Reset form
      setFormData({
        mainCategory: "",
        subCategory: "",
        price: "",
        quantity: "",
        status: "",
        image: null,
      });

      // Reset file input field manually
      document.getElementById("fileInput").value = "";

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8000/api/products/delete/${id}`);
        setProducts(products.filter((product) => product._id !== id)); // Remove deleted product
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Handle View Product (Show Popup)
  const handleView = (product) => {
    setSelectedProduct(product);
  };

  // Handle Edit Product (Open Edit Modal)
  const handleEdit = (product) => {
    setEditFormData(product);
    setIsEditModalOpen(true);
  };

  // Handle Edit Form Input Change
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Handle Edit Form File Change
  const handleEditFileChange = (e) => {
    setEditFormData({ ...editFormData, image: e.target.files[0] });
  };

  // Handle Edit Form Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("mainCategory", editFormData.mainCategory);
    formDataToSend.append("subCategory", editFormData.subCategory);
    formDataToSend.append("price", editFormData.price);
    formDataToSend.append("quantity", editFormData.quantity);
    formDataToSend.append("status", editFormData.status);
    if (editFormData.image) {
      formDataToSend.append("image", editFormData.image);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/products/update/${editFormData._id}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data) {
        setProducts(products.map((product) =>
          product._id === editFormData._id ? response.data : product
        ));
        setIsEditModalOpen(false); // Close Edit Modal
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  // Filter and Search Logic
  const filteredProducts = products
    .filter((product) => {
      if (filterStatus === "All") return true;
      return product.status === filterStatus;
    })
    .filter((product) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        product.mainCategory.toLowerCase().includes(searchLower) ||
        product.subCategory.toLowerCase().includes(searchLower) ||
        product.price.toString().includes(searchLower) ||
        product.quantity.toString().includes(searchLower)
      );
    });

  // Export to CSV
  const csvData = filteredProducts
    .filter((product) => selectedItems.includes(product._id))
    .map(({ mainCategory, subCategory, price, quantity, status }) => ({
      mainCategory,
      subCategory,
      price,
      quantity,
      status,
    }));

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Product List", 20, 10);

    const tableColumn = ["Main Category", "Sub Category", "Price", "Quantity", "Status"];
    const tableRows = filteredProducts
      .filter((product) => selectedItems.includes(product._id))
      .map(({ mainCategory, subCategory, price, quantity, status }) => [
        mainCategory,
        subCategory,
        price,
        quantity,
        status,
      ]);

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("products.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const filteredProducts = products.filter((product) => selectedItems.includes(product._id));
    const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Products</h2>
          <div className="d-flex gap-2">
            <CSVLink data={csvData} filename={"products.csv"} className="btn btn-success"><FaFileCsv /> Export CSV</CSVLink>
            <button className="btn btn-danger" onClick={exportToPDF}><FaFilePdf /> Export PDF</button>
            <button className="btn btn-primary" onClick={exportToExcel}><FaFileExcel /> Export Excel</button>
          </div>
        </div>

        {/* Add Product Form */}
        <form className="product-form d-flex gap-2 mb-3" onSubmit={handleSubmit}>
          <input name="mainCategory" placeholder="Main Category" value={formData.mainCategory} onChange={handleChange} required />
          <input name="subCategory" placeholder="Sub Category" value={formData.subCategory} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
          <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} required />
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>

        {/* Filter and Search */}
        <div className="d-flex justify-content-between mb-3">
          <div>
            <label>Filter by Status: </label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by Main/Sub Category, Price, Quantity"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Product Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th><input type="checkbox" onChange={(e) => {
                if (e.target.checked) {
                  setSelectedItems(currentItems.map((product) => product._id));
                } else {
                  setSelectedItems([]);
                }
              }} /></th>
              <th>S.No</th>
              <th>Main Category</th>
              <th>Sub Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={product._id}>
                <td><input type="checkbox" checked={selectedItems.includes(product._id)} onChange={() => handleCheckboxChange(product._id)} /></td>
                <td>{filteredProducts.length - indexOfFirstItem - index}</td>
                <td>{product.mainCategory}</td>
                <td>{product.subCategory}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.image ? (
                    <img src={`http://localhost:8000/uploads/${product.image}`} alt="product" width="50" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{product.status}</td>
                <td>
                  <button className="btn btn-info btn-sm me-1" onClick={() => handleView(product)}><FaEye /></button>
                  <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit(product)}><FaEdit /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}>Next</button>
        </div>

        {/* View Popup */}
        {selectedProduct && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Product Details</h3>
              <p><strong>Main Category:</strong> {selectedProduct.mainCategory}</p>
              <p><strong>Sub Category:</strong> {selectedProduct.subCategory}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
              <p><strong>Status:</strong> {selectedProduct.status}</p>
              <p><strong>Image:</strong></p>
              {selectedProduct.image && (
                <img src={`http://localhost:8000/uploads/${selectedProduct.image}`} alt="product" width="100" />
              )}
              <button className="btn btn-secondary mt-3" onClick={() => setSelectedProduct(null)}>Close</button>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit Product</h3>
              <form onSubmit={handleEditSubmit}>
                <input name="mainCategory" placeholder="Main Category" value={editFormData.mainCategory} onChange={handleEditChange} required />
                <input name="subCategory" placeholder="Sub Category" value={editFormData.subCategory} onChange={handleEditChange} required />
                <input type="number" name="price" placeholder="Price" value={editFormData.price} onChange={handleEditChange} required />
                <input type="number" name="quantity" placeholder="Quantity" value={editFormData.quantity} onChange={handleEditChange} required />
                <input type="file" accept="image/*" onChange={handleEditFileChange} />
                <select name="status" value={editFormData.status} onChange={handleEditChange} required>
                  <option value="">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;