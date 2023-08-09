import React, { useState } from 'react';
import './DomainSearch.css';

const DomainSearch = () => {
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);

  const errorMessages = [
    "That's a stupid domain. Try another.",
    "Ugh (puke). Why would you even? Give it another shot.",
    "Try again, loser. So dumb - try another one.",
    "Don't waste your money on this sh*t. Try again.",
    "You're ridiculous. You have a problem. Come back later.",
    "Wow, really? That's the best you've got? Have another go.",
    "Seriously? I've seen toddlers pick better. Try once more.",
    "That domain's as dead as disco. Give it another whirl.",
    "You must be joking. That's laughable. Go on, try again.",
    "Is that a typo, or are you really that clueless? Take another stab at it."
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
