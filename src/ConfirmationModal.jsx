import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel, show }) => {
  if (!show) return null;

  return (
    <div className="confirm-msg">
      <strong>{message}</strong>
      <br />
      <div className="cnf-btn-container">
        <button type="button" className="btn btn-success btn-sm" onClick={onConfirm}>
          Yes
        </button>
        <button type="button" className="btn btn-danger btn-sm" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;