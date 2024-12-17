import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';


const SearchComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
      {/* Input field */}
      <input
        type="text"
        placeholder="Search for services"
        className="form-control"
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)} // Hides dropdown
      />

      {/* Dropdown below input */}
      {showDropdown && (
        <div className="search-dropdown">
          <Card className="dropdown-card p-3">
            <ListGroup variant="flush">
              <h5 className="mb-3">Trending searches</h5>
              <div className="d-flex flex-wrap">
                {['Professional cleaning', 'Salon', 'Electricians', 'Plumbers', 'Carpenters', 'Washing machine repair', 'Bathroom repair'].map((item, index) => (
                  <span key={index} className="badge bg-light text-dark m-1">
                    {item}
                  </span>
                ))}
              </div>
            </ListGroup>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
