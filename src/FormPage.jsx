import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormPage.css';
import Navbar from './Navbar';
import UserForm from './UserForm';
import UserTable from './UserTable';
import Pagination from './Pagination';
import ConfirmationModal from './ConfirmationModal';

const FormPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [confirmDeleteMsg, setConfirmDeleteMsg] = useState(false);
  const [confirmLogoutMsg, setConfirmLogoutMsg] = useState(false);
  const [imageError, setImageError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(''); // Ensure search is a string
  const itemsPerPage = 10;
  console.log(imageFile);
  

  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser');
    setLoggedInUser(user);
  }, []);

  // Define all the required functions
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const isSizeValid = file.size <= 2 * 1024 * 1024; // 2 MB

      if (isImage && isSizeValid) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setImageFile(file);
          setImageError('');
        };
        reader.readAsDataURL(file);
      } else {
        setImageError('Please upload a valid image file (less than 2 MB).');
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    navigate('/login');
  };

 

  const handleClose = () => {
    setShowForm(false);
    setImagePreview(null);
  };

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const handleUpdate = (index) => {
    setEditingRow(null);
  };

  const handleDelete = (index) => {
    setConfirmDeleteMsg(index);
  };

  const confirmDelete = (confirm) => {
    if (confirm && confirmDeleteMsg !== false) {
      const newTableData = tableData.filter((_, i) => i !== confirmDeleteMsg);
      setTableData(newTableData);
    }
    setConfirmDeleteMsg(false);
  };

  const confirmLogout = (confirm) => {
    if (confirm) {
      handleLogout();
    }
    setConfirmLogoutMsg(false);
  };

  const handleInputChange = (index, field, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imagePreview || !imagePreview.startsWith('data:image/')) {
      setImageError('Please upload a valid image file.');
      return;
    }

    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      address: e.target.address.value,
      image: imagePreview,
    };

    setTableData((prevData) => [...prevData, formData]);
    setShowForm(false);
    setImagePreview(null);
    setImageError('');

    e.target.reset();
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isSizeValid = file.size <= 2 * 1024 * 1024; // 2 MB

    if (!isImage || !isSizeValid) {
      setImageError('Please upload a valid image file (less than 2 MB).');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTableData((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = { ...updatedData[index], image: reader.result };
        return updatedData;
      });
      setImageError('');
    };
    reader.readAsDataURL(file);
  };


  const filteredData = tableData.filter((data) => {
    const searchValue = search ? search.toLowerCase() : ''; 
    const firstNameMatch = data.firstName
      ? data.firstName.toLowerCase().includes(searchValue)
      : false;
    const mobileMatch = data.mobile ? data.mobile.includes(search) : false;

    return firstNameMatch || mobileMatch;
  });

  return (
    <div className="formpage-container">
      <div
        className={`background-content ${
          showForm || confirmDeleteMsg !== false || confirmLogoutMsg ? 'blur-background' : ''
        }`}
      >
        <Navbar
          loggedInUser={loggedInUser}
          imagePreview={imagePreview}
          setConfirmLogoutMsg={setConfirmLogoutMsg}
          setSearch={setSearch} // Passing setSearch to Navbar
        />

        <br />
        <div className="formbutton">
          <button type="button" className="btn btn-primary" onClick={() => setShowForm(true)}>
            Form
          </button>
        </div>

        <div className="table-list">
          <UserTable
            currentItems={filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} // Use filtered data
            editingRow={editingRow}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            imageError={imageError}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / itemsPerPage)} // Calculate total pages from filtered data
            setCurrentPage={setCurrentPage}
          />
        </div>    
      </div>

      <UserForm
        showForm={showForm}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        imageError={imageError}
      />

      <ConfirmationModal
        message="Are you sure you want to delete?"
        onConfirm={() => confirmDelete(true)}
        onCancel={() => confirmDelete(false)}
        show={confirmDeleteMsg !== false}
      />

      <ConfirmationModal
        message="Are you sure you want to logout?"
        onConfirm={() => confirmLogout(true)}
        onCancel={() => confirmLogout(false)}
        show={confirmLogoutMsg}
      />
    </div>
  );
};

export default FormPage;
