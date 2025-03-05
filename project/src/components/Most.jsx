import React from "react";
import Slider from "react-slick";
import mbs1 from '../mbs1.webp'
import mbs2 from '../mbs2.webp'
import mbs3 from '../mbs3.webp'
import mbs4 from '../mbs4.webp'
import mbs5 from '../mbs5.webp'
import mbs6 from '../mbs6.webp'
import mbs7 from '../mbs7.webp'
import mbs8 from '../mbs8.webp'
import mbs9 from '../mbs9.webp'
import mbs10 from '../mbs10.webp'

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosStar } from "react-icons/io"; // Import star icon
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

function MostCarousel() {
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
    { image: mbs1, route: "/most1", title: "Intense bathroom cleaning", rating: 4.82, reviews: "117K", price: "₹109" },
    { image: mbs2, route: "/most2", title: "Intense cleaning (bathrooms)", rating: 4.86, reviews: "81K", price: "₹79" },
    { image: mbs3, route: "/most3", title: "machine check-up (top load)", rating: 4.86, reviews: "17K", price: "₹239" },
    { image: mbs4, route: "/most4", title: "Fan repair (ceiling/exhaust)", rating: 4.86, reviews: "52K", price: "₹49" },
    { image: mbs5, route: "/most5", title: "machine check-up (front load)", rating: 4.84, reviews: "25K", price: "₹169" },
    { image: mbs6, route: "/most6", title: "Power saver AC service", rating: 4.80, reviews: "102K", price: "₹199" },
    { image: mbs7, route: "/most7", title: "AC uninstallation", rating: 4.89, reviews: "47K", price: "₹99" },
    { image: mbs8, route: "/most8", title: "Water purifier repair", rating: 4.82, reviews: "83K", price: "₹139" },
    { image: mbs9, route: "/most9", title: "Classic bathroom cleaning", rating: 4.85, reviews: "66K", price: "₹159" },
    { image: mbs10, route: "/most10", title: "Move-in bathroom cleaning", rating: 4.87, reviews: "91K", price: "₹129" },
  ];

  return (
    <div className="most-carousel-wrapper">
      <p className="most-carousel-heading">Most Booked Services</p>
      <Slider {...carouselConfig}>
        {otherServices.map((service, index) => (
          <div
            key={index}
            className="most-card"
            onClick={() => (window.location.href = service.route)}
            style={{ cursor: "pointer" }}
          >
            <img src={service.image} alt={service.title} className="most-image" />
            <div className="most-details">
              <p className="most-title">{service.title}</p>
              <p className="most-rating">
                <IoIosStar className="most-star-icon" /> {service.rating} ({service.reviews})
              </p>
              <p className="most-price">{service.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

function App() {
  return (
    <div>
      <MostCarousel />
      
    </div>
  );
}

export default App;
