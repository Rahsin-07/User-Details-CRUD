import React from 'react';
import { IoMdClose } from "react-icons/io";

const UserForm = ({ showForm, handleClose, handleSubmit, handleImageUpload, imageError }) => {
  return (
    <div className={`hiddencontent ${showForm ? 'slide-in' : 'slide-out'}`}>
      <div className="usercontainer">
        <div className="customerx">
          <IoMdClose type="button" onClick={handleClose} />
        </div>
        <h4>User Details</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First name:</label>
          <input type="text" id="firstName" name="firstName" required />
          <br />

          <label htmlFor="lastName">Last name:</label>
          <input type="text" id="lastName" name="lastName" required />
          <br />

          <label htmlFor="email">Email Id:</label>
          <input type="email" id="email" name="email" required />
          <br />

          <label htmlFor="mobile">Mobile no:</label>
          <input type="number" id="mobile" name="mobile" required />
          <br />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required />
          <br /> <br />

          <label htmlFor="upload" className="upload-btn">Choose File</label>
          <input
            type="file"
            id="upload"
            onChange={handleImageUpload}
            className="upload-btn"
            style={{ display: 'none' }}
          />

          {imageError && <span className="error-message">{imageError}</span>}

          <div className="btn-container">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;