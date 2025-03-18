import React from 'react';

const Navbar = ({ loggedInUser, imagePreview, setConfirmLogoutMsg, setSearch }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand">User's List</span>
        
       
        <input
          type="search"
          id="searchBox"
          onChange={(e) => setSearch(e.target.value)} 
          style={{ width: '600px', height: '40px', marginLeft: '230px' }}
          placeholder="Search by First Name or Mobile..."
        />

        <div className="d-flex ms-auto align-items-center">
       
          Welcome, {loggedInUser}
  
          {loggedInUser && (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* User's Profile Image */}
                <img
                  src={imagePreview || './userlogo.png'}
                  alt="Profile"
                  className="rounded-circle"
                  width="30"
                  height="30"
                />
              </button>
              
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setConfirmLogoutMsg(true)} // Triggering logout confirmation modal
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
