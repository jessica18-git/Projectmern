import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import salon1 from '../../salon1.webp';
import salon2 from '../../salon2.webp';
import salon3 from '../../salon3.webp';
import salon4 from '../../salon4.webp';
import salon5 from '../../salon5.webp';
import salon6 from '../../salon6.webp';
import salon7 from '../../salon7.webp';
import salon8 from '../../salon8.webp';
import salon9 from '../../salon9.webp';
import saloncar from '../../salon-car.webp';


function SalonPage() {
  return (
  <div className="salon-container-updated">
      <div className="salon-header-updated">
        <h1>Salon for women</h1>
        <div className="rating-updated">
          <span className="rating-badge-updated">4.85</span>
          <span className="review">1.0 M reviews</span>
        </div>
      </div>


      <div className="services-section-updated">
      <h3>Select a service</h3>
        <div className="services-grid-updated">
          
          
          <Link to="/packages" className="service-item-updated">
            <img src={salon1} alt="Packages" className="service-image-updated" />
            <p className="salonpara">Packages</p>
          </Link>
          <Link to="/make-your-package" className="service-item-updated">
            <img src={salon2} alt="Make Your Package" className="service-image-updated" />
            <p className="salonpara">Make your package</p>
          </Link>
          <Link to="/waxing" className="service-item-updated">
            <img src={salon3} alt="Waxing" className="service-image-updated" />
            <p className="salonpara">Waxing</p>
          </Link>
          <Link to="/pedicure" className="service-item-updated">
            <img src={salon4} alt="Pedicure" className="service-image-updated" />
            <p className="salonpara">Pedicure</p>
          </Link>
          <Link to="/manicure" className="service-item-updated">
            <img src={salon5} alt="Manicure" className="service-image-updated" />
            <p className="salonpara">Manicure</p>
          </Link>
          <Link to="/hair-care" className="service-item-updated">
            <img src={salon6} alt="Hair Care" className="service-image-updated" />
            <p className="salonpara">Hair care</p>
          </Link>
          <Link to="/facial-cleanup" className="service-item-updated">
            <img src={salon7} alt="Facial & Cleanup" className="service-image-updated" />
            <p className="salonpara">Facial & cleanup</p>
          </Link>
          <Link to="/bleach-detan" className="service-item-updated">
            <img src={salon8} alt="Bleach & Detan" className="service-image-updated" />
            <p className="salonpara">Bleach & detan</p>
          </Link>
          <Link to="/threading" className="service-item-updated">
            <img src={salon9} alt="Threading & Face Waxing" className="service-image-updated" />
            <p className="salonpara">Threading & face waxing</p>
          </Link>
        </div>
      </div>

      <div className="banner-section-updated">
        <div className="banner-updated">
          <img src={saloncar} alt="Advanced tools & ingredients" className="banner-image-updated" />
        </div>
      </div>
    </div>

  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<SalonPage />} />
      <Route path="/packages" element={<div>Packages Page</div>} />
      <Route path="/make-your-package" element={<div>Make Your Package Page</div>} />
      <Route path="/waxing" element={<div>Waxing Page</div>} />
      <Route path="/pedicure" element={<div>Pedicure Page</div>} />
      <Route path="/manicure" element={<div>Manicure Page</div>} />
      <Route path="/hair-care" element={<div>Hair Care Page</div>} />
      <Route path="/facial-cleanup" element={<div>Facial & Cleanup Page</div>} />
      <Route path="/bleach-detan" element={<div>Bleach & Detan Page</div>} />
      <Route path="/threading" element={<div>Threading & Face Waxing Page</div>} />
    </Routes>
  );
}

export default App;  