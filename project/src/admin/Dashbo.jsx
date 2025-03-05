import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({ orders: 0, sales: 0, customers: 0, onlineUsers: 0 });

  useEffect(() => {
    axios.get("http://localhost:8000/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  const data = [
    { name: "Orders", value: stats.orders },
    { name: "Sales", value: stats.sales },
    { name: "Customers", value: stats.customers },
    { name: "Online Users", value: stats.onlineUsers },
  ];

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
