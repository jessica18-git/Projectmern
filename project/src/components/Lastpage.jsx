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
    { image: last1, route: "/lastsec1", title: "Fan repair(ceiling/exhaust)", rating: 4.82, reviews: "117K", price: "₹109" },
    { image: last2, route: "/lastsec2", title: "Switchboard/box repair", rating: 4.86, reviews: "81K", price: "₹79" },
    { image: last3, route: "/lastsec3", title: "Switchbox installation/repair", rating: 4.86, reviews: "17K", price: "₹239" },
    { image: last4, route: "/lastsec4", title: "Switch/Socket replacement", rating: 4.86, reviews: "52K", price: "₹49" },
    { image: last5, route: "/lastsec5", title: "Fan replacement(ceiling)", rating: 4.84, reviews: "25K", price: "₹169" },
    { image: last6, route: "/lastsec6", title: "Switchboard installation", rating: 4.80, reviews: "102K", price: "₹199" },
    { image: last7, route: "/lastsec7", title: "Bulb/tubelight installation", rating: 4.89, reviews: "47K", price: "₹99" },
    { image: last8, route: "/lastsec8", title: "Ceiling light installation", rating: 4.82, reviews: "83K", price: "₹139" },
    { image: last9, route: "/lastsec9", title: "Geyser installation/repair", rating: 4.85, reviews: "66K", price: "₹159" },
    { image: last10, route: "/lastsec10", title: "Fan regulator replacement", rating: 4.87, reviews: "91K", price: "₹129" },
  ];

  return (
    <div className="last-carousel-wrapper">
      <p className="last-carousel-heading  m-0">Quick home repairs</p>
      <Slider {...carouselConfig}>
        {otherServices.map((service, index) => (
          <div
            key={index}
            className="last-card"
            onClick={() => (window.location.href = service.route)}
            style={{ cursor: "pointer" }}
          >
            <img src={service.image} alt={service.title} className="last-image" />
            <div className="last-details">
              <p className="last-title">{service.title}</p>
              <p className="last-rating">
                <IoIosStar className="star-icon" /> {service.rating} ({service.reviews})
              </p>
              <p className="last-price">{service.price}</p>
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
      <LastCarousel />
      
    </div>
  );
}

export default App;
