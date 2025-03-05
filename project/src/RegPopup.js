import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const RegPopup = ({ show, handleClose }) => {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    date: "",
    number: "",
  });

  const [registrationErrors, setRegistrationErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateRegistrationForm = () => {
    const errors = {};

    if (!registrationData.name) errors.name = "Name is required.";
    if (!registrationData.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(registrationData.email))
      errors.email = "Invalid email address.";
    if (!registrationData.password) errors.password = "Password is required.";
    else if (registrationData.password.length < 6)
      errors.password = "Password must be at least 6 characters long.";
    if (registrationData.password !== registrationData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (!registrationData.date) errors.date = "Date of birth is required.";
    if (!registrationData.number) errors.number = "Contact number is required.";

    setRegistrationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    if (validateRegistrationForm()) {
      try {
        const response = await fetch("http://localhost:3001/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registrationData),
        });

        if (response.ok) {
          setShowSuccessModal(true);
          setRegistrationData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            date: "",
            number: "",
          });
          handleClose();
        } else {
          const errorText = await response.text();
          console.error("Registration failed:", errorText);
        }
      } catch (error) {
        console.error("Error submitting registration:", error);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegistrationSubmit}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={registrationData.name}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {registrationErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={registrationData.email}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {registrationErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={registrationData.password}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {registrationErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={registrationData.confirmPassword}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {registrationErrors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Control
                type="date"
                name="date"
                value={registrationData.date}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.date}
              />
              <Form.Control.Feedback type="invalid">
                {registrationErrors.date}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formNumber">
              <Form.Control
                type="text"
                name="number"
                placeholder="Enter your contact number"
                value={registrationData.number}
                onChange={handleRegistrationChange}
                isInvalid={!!registrationErrors.number}
              />
              <Form.Control.Feedback type="invalid">
                {registrationErrors.number}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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

export default RegPopup;