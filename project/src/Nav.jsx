import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Form, Button, Modal, InputGroup, FormControl, Card, ListGroup } from 'react-bootstrap';
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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [registrationData, setRegistrationData] = useState({ name: '', email: '', password: '', confirmPassword: '', date: '', number: '' });
  const [registrationErrors, setRegistrationErrors] = useState({});
  const profileDropdownRef = useRef(null);

  const validateLoginForm = () => {
    const errors = {};
    if (!loginData.email) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) errors.email = 'Invalid email address.';
    if (!loginData.password) errors.password = 'Password is required.';
    else if (loginData.password.length < 6) errors.password = 'Password must be at least 6 characters long.';
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegistrationForm = () => {
    const errors = {};
    if (!registrationData.name) errors.name = 'Name is required.';
    if (!registrationData.email) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(registrationData.email)) errors.email = 'Invalid email address.';
    if (!registrationData.password) errors.password = 'Password is required.';
    else if (registrationData.password.length < 6) errors.password = 'Password must be at least 6 characters long.';
    if (registrationData.password !== registrationData.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    if (!registrationData.date) {
      errors.date = 'Date of birth is required.';
  } 
    if (!registrationData.number) errors.number = 'Contact number is required.';
    setRegistrationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  function handleLoginSubmit(event) {
    event.preventDefault();
  
    const loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
  
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "You're now logged in!") {
          window.alert(data.message);
        } else {
          window.alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        window.alert('Invalid User');
      });
  }
  
  

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    if (validateRegistrationForm()) {
      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationData),
        });

        if (response.ok) {
          setShowRegistrationModal(false);
          setShowSuccessModal(true);
          setRegistrationData({ name: '', email: '', password: '', confirmPassword: '', date: '', number: '' });
        } else {
          const errorText = await response.text();
          console.error('Registration failed:', errorText);
        }
      } catch (error) {
        console.error('Error submitting registration:', error);
      }
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
      setShowProfileDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" bg="white" variant="light" className="border-bottom px-4 py-3 sticky-top">
        <Navbar.Brand as={Link} to="/Nat" className="d-flex align-items-center">
          <img src={img} alt="Urban Company Logo" className="logo" />
          <span className="text-muted ms-5">Native</span>
        </Navbar.Brand>

        {/* Center Section */}
        <Nav className="mx-auto d-flex align-items-center">
          <InputGroup className="me-3 location-dropdown" onClick={() => setShowLocationOverlay(true)}>
            <InputGroup.Text style={{ padding: '0 5px', backgroundColor: 'transparent', border: 'none' }}>
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

          <div style={{ position: 'relative' }}>
            <InputGroup className="search-bar">
              <InputGroup.Text style={{ padding: '0 5px', backgroundColor: 'transparent', border: 'none' }}>
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

            {showSearchDropdown && (
              <Card className="dropdown-card p-3" style={{ position: 'absolute', top: '40px', width: '100%', zIndex: 1000 }}>
                <ListGroup variant="flush">
                  <h5 className="mb-3">Trending searches</h5>
                  <div className="d-flex flex-wrap">
                    {['Professional cleaning', 'Salon', 'Electricians', 'Plumbers', 'Carpenters', 'Washing machine repair', 'RO repair'].map((item, index) => (
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

          <Nav.Link onClick={toggleProfileDropdown} style={{ cursor: 'pointer', position: 'relative' }}>
            <IoPersonCircleOutline size={20} />
          </Nav.Link>

          {showProfileDropdown && (
            <div
              ref={profileDropdownRef}
              style={{
                position: 'absolute',
                top: '60px',
                right: '10px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '10px',
                zIndex: 1000,
                width: '200px',
              }}
            >
              <p style={{ margin: 0, padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }} onClick={() => setShowLoginModal(true)}>
                Login
              </p>
              <p style={{ margin: 0, padding: '10px', cursor: 'pointer' }} onClick={() => setShowRegistrationModal(true)}>
                Registration
              </p>
            </div>
          )}
        </Nav>
      </Navbar>

      <LocationOverlay show={showLocationOverlay} onClose={() => setShowLocationOverlay(false)} />

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
          <Modal.Title className="loginheading" style={{ textDecoration: 'none', border: 'none', margin: -10 }}>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="loginform1" controlId="formEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginChange}
                isInvalid={!!loginErrors.email}
              />
              <Form.Control.Feedback type="invalid">{loginErrors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="loginform" controlId="formPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                isInvalid={!!loginErrors.password}
              />
              <Form.Control.Feedback type="invalid">{loginErrors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      
{/* Success Modal */}
<Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Registration successful!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Registration Modal */}
      <Modal show={showRegistrationModal} onHide={() => setShowRegistrationModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
          <Modal.Title className="loginheading" style={{ textDecoration: 'none', border: 'none', margin: -10 }}>
            Registration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegistrationSubmit}>
            <Form.Group className="loginform" controlId="formName">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={registrationData.name}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.name}
              />
              <Form.Control.Feedback type="invalid">{registrationErrors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="loginform" controlId="formEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={registrationData.email}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.email}
              />
              <Form.Control.Feedback type="invalid">{registrationErrors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="loginform" controlId="formPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={registrationData.password}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.password}
              />
              <Form.Control.Feedback type="invalid">{registrationErrors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="loginform" controlId="formConfirmPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={registrationData.confirmPassword}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{registrationErrors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="loginform" controlId="formDate">
              <Form.Label></Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={registrationData.date}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.date}
              />
              <Form.Control.Feedback type="invalid">{registrationErrors.date}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="loginform" controlId="formNumber">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                name="number"
                placeholder="Enter your contact number"
                value={registrationData.number}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.number}
              />
              <Form.Control.Feedback type="invalid">{registrationErrors.number}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Registration successful!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomNavbar;
