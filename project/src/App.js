import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Nav.jsx';
import NextSection from './components/NextSection';
import HomePage from './components/HomePage';
import Lastpage from './components/Lastpage';
import Footer from './components/Footer';
import Salon from './components/services/Salon';
import AcRepair from './components/services/AcRepair';
import Cleaning from './components/services/Cleaning';
import Electrical from './components/services/Electrical';
import WaterPurifier from './components/services/WaterPurifier';
import Painting from './components/services/Painting';
import Profile from './Profile';
import Cart from './Cart';
import Clipboard from './Clipboard';
import './App.css';
import ViewCart from './ViewCart.jsx';
import Confirm from './Confirm.jsx';

// Import Admin Panel Components
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import ManageOrders from "./admin/ManageOrders";
import Products from "./admin/Products.js";

import Sidebar from "./admin/Sidebar";
import Dashbo from "./admin/Dashbo";
import Categories from "./admin/Categories";
import Orders from "./admin/Orders";


function App() {
  const location = useLocation(); // Get current route

  // Define pages where Nav and Footer should be hidden
  const hideNav = ["/admin", "/dashboard", "/categories", "/products"];


  return (
    <div className="App">
      {/* Hide Nav on specific pages */}
      {!hideNav.includes(location.pathname) && <Nav />}

      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <NextSection />
            <Lastpage />
            <Footer />
          </>
        } />
        <Route path="/salon" element={<Salon />} />
        <Route path="/ac-repair" element={<AcRepair />} />
        <Route path="/cleaning" element={<Cleaning />} />
        <Route path="/electrical" element={<Electrical />} />
        <Route path="/water-purifier" element={<WaterPurifier />} />
        <Route path="/painting" element={<Painting />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/clipboard" element={<Clipboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/confirm" element={<Confirm />} />

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<ManageOrders />} />
        <Route path="/products" element={<Products />} />

        <Route path="/admin" element={<Dashbo />} />
        <Route path="/categories" element={<Categories />} /> 
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/Sidebar" element={<Sidebar />} />
      </Routes>
    </div>
  );
}

export default App;
