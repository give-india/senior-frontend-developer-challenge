import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ showError, onClose }) => {
  if (!showError) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3> Invalid Path</h3>
        <p> {showError}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
