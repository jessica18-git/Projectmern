import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import sfwo1 from '../sfwo1.png';
import sfwo2 from '../sfwo2.png';
import sfwo3 from '../sfwo3.png';
import sfwo4 from '../sfwo4.png';
import sfwo5 from '../sfwo5.png';
import sfwo6 from '../sfwo6.png';
import sfwo7 from '../sfwo7.png';
import hoverImage from '../sofa-section.webp';
import another1 from '../next1.png';
import another2 from '../next2.png';
import another3 from '../next3.png';
import another4 from '../next4.png';
import another5 from '../next5.png';


import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components
function NextArrowButton(props) {
  const { onClick } = props;
  return (
    <div className="arrow-next-btn" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
}

function PrevArrowButton(props) {
  const { onClick } = props;
  return (
    <div className="arrow-prev-btn" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
}

function ServicesCarousel() {
  const carouselConfig = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrowButton />,
    prevArrow: <PrevArrowButton />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const beautyServices = [
    { image: sfwo2, route:"/pedicure" },
    { image: sfwo1, route: "/manicure" },
    { image: sfwo3, route: "/haircare" },
    { image: sfwo4, route: "/facial" },
    { image: sfwo5, route: "/bleach" },
    { image: sfwo6, route: "/spa" },
    { image: sfwo7, route: "/makeup" },
  ];

  return (
    <div className="carousel-wrapper">
      <p className="carousel-heading m-0">Salon for Women</p>
      <Slider {...carouselConfig}>
        {beautyServices.map((service, index) => (
          <div key={index} className="beauty-card">
            <Link to={service.route}>
              <img src={service.image} alt={service.title} className="beauty-image" />
              <p className="service-title">{service.title}</p>
            </Link>
          </div>
        ))}
      </Slider>
      
      <div className="hover-image-section">
  <Link to="/special-service">
    <div className="hover-image-wrapper" style={{ overflow: 'hidden' }}>
      <img 
        src={hoverImage} 
        alt="Special Service" 
        className="hover-image" 
        style={{ 
          transition: 'transform 0.1s ease, opacity 0.6s ease', 
          transform: 'scale(1)', 
          opacity: '1' 
        }} 
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.01)';
          e.target.style.opacity = '0.99';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.opacity = '1';
        }}
      />
    </div>
  </Link>
      </div>
    </div>
  );
}

function AnotherCarousel() {
  const carouselConfig = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrowButton />,
    prevArrow: <PrevArrowButton />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const otherServices = [
    { image: another1, route:"/service1" },
    { image: another2, route: "/service2" },
    { image: another3, route: "/service3" },
    { image: another4, route: "/service4" },
    { image: another5, route: "/service5" },
    
  ];

  return (
    <div className="another-carousel-wrapper">
      <p className="another-carousel-heading  m-0">AC & appliance repair</p>
      <Slider {...carouselConfig}>
        {otherServices.map((service, index) => (
          <div
            key={index}
            className="another-card"
            onClick={() => (window.location.href = service.route)}
            style={{ cursor: 'pointer' }} // Optional: Add a pointer cursor for better UX
          >
            <img src={service.image} alt={service.title} className="another-image" />
            <p className="another-title">{service.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
  
}

function App() {
  return (
    <div>
      <ServicesCarousel />
      <AnotherCarousel />
    </div>
  );
}

export default App;
