import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
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



import Cart from './Cart';
import Clipboard from './Clipboard';
import Profile from './Profile';

import './App.css';

function App() {
  return (
    <div className="App">
      <Nav /> 
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/salon" element={<Salon />} />
        <Route path="/ac-repair" element={<AcRepair />} />
        <Route path="/cleaning" element={<Cleaning />} />
        <Route path="/electrical" element={<Electrical />} />
        <Route path="/water-purifier" element={<WaterPurifier />} />
        <Route path="/painting" element={<Painting />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/clipboard" element={<Clipboard />} />
        <Route path="/profile" element={<Profile />} />
     </Routes>
     <Routes>
        <Route path="/" element={<NextSection />} />
     </Routes>
     <Routes>
        <Route path="/" element={<Lastpage />} />
     </Routes>
     <Routes>
        <Route path="/" element={<Footer />} />
     </Routes>
     
      
    </div>
  );
}

export default App;
