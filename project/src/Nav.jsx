import React, { useState } from 'react';
import { Navbar, Nav, FormControl, InputGroup, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img from "./image/urban.webp"; 
import { GrLocation } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { TbClipboardText } from "react-icons/tb";
import { LuShoppingCart } from "react-icons/lu";
import { IoPersonCircleOutline } from "react-icons/io5";
import LocationOverlay from './LocationOverlay';

const CustomNavbar = () => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showLocationOverlay, setShowLocationOverlay] = useState(false);

  return (
    <>
      <Navbar expand="lg" bg="white" variant="light" className="border-bottom px-4 py-3 sticky-top">
        <Navbar.Brand as={Link} to="/Nat" className="d-flex align-items-center"><Navbar.Brand />
          <img src={img} alt="Urban Company Logo" className="logo" />
          <span className="text-muted ms-5">Native</span>
        </Navbar.Brand>

        <Nav className="mx-auto d-flex align-items-center">
          {/* Location Input */}
          <InputGroup className="me-3 location-dropdown" onClick={() => setShowLocationOverlay(true)}>
            <InputGroup.Text style={{ padding: '0 5px', margin: 0, backgroundColor: 'transparent', border: 'none' }}>
              <GrLocation />
            </InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Location"
              style={{ padding: '5px' }} 
              className="border-0"
              readOnly
            />
          </InputGroup>

          {/* Search Bar with Dropdown */}
          <div style={{ position: 'relative' }}>
            <InputGroup className="search-bar">
              <InputGroup.Text style={{ padding: '0 5px', margin: 0, backgroundColor: 'transparent', border: 'none' }}>
                <FiSearch />
              </InputGroup.Text>
              <FormControl
                type="search"
                placeholder="Search for services"
                style={{ padding: '5px' }}
                className="border-0"
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setShowSearchDropdown(false)}
              />
            </InputGroup>

            {/* Dropdown for trending searches */}
            {showSearchDropdown && (
              <Card className="dropdown-card p-3">
                <ListGroup variant="flush">
                  <h5 className="mb-3">Trending searches</h5>
                  <div className="d-flex flex-wrap">
                    {['Professional cleaning', 'Salon', 'Electricians', 'Plumbers', 'Carpenters', 'Washing machine repair', 'Ro repair'].map((item, index) => (
                      <span key={index} className="badge bg-light text-dark m-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </ListGroup>
              </Card>
            )}
          </div>
        </Nav>

        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link as={Link} to="/clipboard"><TbClipboardText size={20} /></Nav.Link>
          <Nav.Link as={Link} to="/cart"><LuShoppingCart size={20} /></Nav.Link>
          <Nav.Link as={Link} to="/profile"><IoPersonCircleOutline size={20} /></Nav.Link>
        </Nav>
      </Navbar>

      {/* Location Overlay */}
      <LocationOverlay show={showLocationOverlay} onClose={() => setShowLocationOverlay(false)} />
    </>
  );
};

export default CustomNavbar;
