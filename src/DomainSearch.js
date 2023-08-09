import React, { useState } from 'react';
import './DomainSearch.css';

const DomainSearch = () => {
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);

  const errorMessages = [
    "Error 1: Invalid domain",
    "Error 2: Domain not found",
    // ... Add more error messages
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    // Allow only alphanumeric characters
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInputValue(value);
      setShowError(false);
      setError('');
    } else {
      setShowError(true);
      setError("Only alphanumeric characters are permitted in domains.");
      // Set a timeout to clear the error after two seconds
      setTimeout(() => {
        setShowError(false);
        setError('');
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear alphanumeric error if any
    if (/^[a-zA-Z0-9]+$/.test(inputValue)) {
      const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      setError(randomErrorMessage);
      setShowError(true);
    }
  };  

  return (
    <div className="domain-search-wrapper">
      <form onSubmit={handleSubmit} className={showError ? 'error' : ''}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Type the domain you want"
            value={inputValue}
            onChange={handleChange}
            className={showError ? 'error-input' : ''}
          />
          <button type="submit">Search Domain</button>
        </div>
      </form>
      {showError && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default DomainSearch;
