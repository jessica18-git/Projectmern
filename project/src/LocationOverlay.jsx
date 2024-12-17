import React from 'react';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa6";
import { LuLocateFixed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

const LocationOverlay = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <Card className="overlay-card location-card p-3" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <FaArrowLeft onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>
       
        <InputGroup className="border-1">
          <FormControl
            type="text"
            placeholder="Search for your location/society/apartment"
          />
        </InputGroup>
        
        <Button variant="link" className="text-primary">
          <LuLocateFixed /> Use current location
        </Button>
        
        <p className="text-muted mt-3" style={{ fontSize: '0.7rem' }}>
          powered by <FcGoogle />
        </p>
      </Card>
    </div>
  );
};

export default LocationOverlay;
