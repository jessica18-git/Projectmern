// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ManageOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8000/orders").then((response) => {
//       setOrders(response.data);
//     });
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Manage Orders</h2>
//       <table className="table table-bordered mt-3">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Total Price</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td>{order._id}</td>
//               <td>${order.total}</td>
//               <td>{order.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ManageOrders;
