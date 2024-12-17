import React from "react";
import Slider from "react-slick";
import last1 from '../last1.webp';
import last2 from '../last2.webp';
import last3 from '../last3.webp';
import last4 from '../last4.webp';
import last5 from '../last5.webp';
import last6 from '../last6.webp';
import last7 from '../last7.webp';
import last8 from '../last8.webp';
import last9 from '../last9.webp';
import last10 from '../last10.webp';




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


function LastCarousel() {
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
    { image: last1, route:"/lastsec1" },
    { image: last2, route:"/lastsec2" },
    { image: last3, route:"/lastsec3" },
    { image: last4, route:"/lastsec4" },
    { image: last5, route:"/lastsec5" },
    { image: last6, route:"/lastsec6" },
    { image: last7, route:"/lastsec7" },
    { image: last8, route:"/lastsec8" },
    { image: last9, route:"/lastsec9" },
    { image: last10, route:"/lastsec10" },
    
    
    
  ];

  return (
    <div className="last-carousel-wrapper">
      <p className="last-carousel-heading"> Quick home repair</p>
      <Slider {...carouselConfig}>
        {otherServices.map((service, index) => (
          <div
            key={index}
            className="last-card"
            onClick={() => (window.location.href = service.route)}
            style={{ cursor: 'pointer' }} 
          >
            <img src={service.image} alt={service.title} className="last-image" />
            <p className="last-title">{service.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
  
}

function App() {
  return (
    <div>
      <LastCarousel />
      
    </div>
  );
}

export default App;
