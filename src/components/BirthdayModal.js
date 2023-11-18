import React, { useState, useEffect } from 'react';

const BirthdayModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Happy Birthday!</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>We hope you have a great day!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayModal;
