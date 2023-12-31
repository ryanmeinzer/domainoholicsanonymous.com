import React, { useState, useEffect } from 'react';
import './DomainSearch.css';

const DomainSearch = () => {
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('Type the domain you want');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPlaceholderText('Type desired domain'); // Placeholder for mobile
      } else {
        setPlaceholderText('Type the domain you want'); // Placeholder for desktop
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run only on mount and unmount

  const errorMessages = [
    "That's a stupid domain. Try another.",
    "Ugh (puke). Why would you even? Give it another shot.",
    "Try again, loser. So dumb - try another one.",
    "Don't waste your money on this sh*t. Try again.",
    "That's downright ridiculous. You have a problem. Come back later.",
    "That's the best you've got? Have another go.",
    "Don't quick your day job on this one. Try once more.",
    "Just give up. Go home, then give it another whirl.",
    "You must be joking, try again.",
    "Is that a typo, or are you really that dumb? Take another stab at it."
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    // // Allow only alphanumeric characters
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInputValue(value);
      setShowError(false);
      setError('');
    } else {
      setShowError(true);
      // setError("Only alphanumeric characters for domains here.");
      setError("Only enter letters and numbers. We'll search all domain extensions like .com, .org, etc.");
      // Set a timeout to clear the error after two seconds
      setTimeout(() => {
        setShowError(false);
        setError('');
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // // Clear alphanumeric error if any
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
            placeholder={placeholderText}
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
