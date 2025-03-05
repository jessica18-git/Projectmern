// import { useState } from "react";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     mainCategory: "",
//     subCategory: "",
//     price: "",
//     quantity: "",
//     image: "",
//     status: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setProducts([...products, formData]);
//     setFormData({
//       mainCategory: "",
//       subCategory: "",
//       price: "",
//       quantity: "",
//       image: "",
//       status: "",
//     });
//   };

//   return (
//     <div>
//       <h2>Products</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="mainCategory" placeholder="Main Category" onChange={handleChange} />
//         <input name="subCategory" placeholder="Sub Category" onChange={handleChange} />
//         <input name="price" placeholder="Price" onChange={handleChange} />
//         <input name="quantity" placeholder="Quantity" onChange={handleChange} />
//         <input name="image" placeholder="Image URL" onChange={handleChange} />
//         <select name="status" onChange={handleChange}>
//           <option value="">Select Status</option>
//           <option value="Available">Available</option>
//           <option value="Out of Stock">Out of Stock</option>
//         </select>
//         <button type="submit">Add Product</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>Main Category</th>
//             <th>Sub Category</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Image</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={index}>
//               <td>{product.mainCategory}</td>
//               <td>{product.subCategory}</td>
//               <td>{product.price}</td>
//               <td>{product.quantity}</td>
//               <td><img src={product.image} alt="product" width="50" /></td>
//               <td>{product.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Products;
