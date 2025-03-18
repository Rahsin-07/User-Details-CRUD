import React from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";   
import { MdOutlineDriveFolderUpload } from "react-icons/md";

const UserTable = ({
  currentItems,
  editingRow,
  handleEdit,
  handleUpdate,
  handleDelete,
  handleInputChange,
  handleImageChange,
  imageError,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Profile</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email Id</th>
          <th>Mobile no</th>
          <th>Address</th>
          <th className="black">Edit/Update</th>
          <th className="black">Delete</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((data, index) => (
          <tr key={index}>
            <td>
              {editingRow === index ? (
                <>
                  <div className="image-and-button">
                    {data.image && (
                      <img
                        src={data.image}
                        alt="Profile"
                        className="rounded-circle"
                        width="30"
                        height="30"
                      />
                    )}
                    <label htmlFor={`upload-${index}`} className="upload-btn">
                      Choose File
                    </label>
                    <input
                      type="file"
                      id={`upload-${index}`}
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      style={{ display: 'none' }}
                    />
                  </div>
                </>
              ) : (
                data.image && (
                  <img
                    src={data.image}
                    alt="Profile"
                    className="rounded-circle"
                    width="30"
                    height="30"
                  />
                )
              )}
            </td>
            <td>
              {editingRow === index ? (
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                />
              ) : (
                data.firstName
              )}
            </td>
            <td>
              {editingRow === index ? (
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                />
              ) : (
                data.lastName
              )}
            </td>
            <td>
              {editingRow === index ? (
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                />
              ) : (
                data.email
              )}
            </td>
            <td>
              {editingRow === index ? (
                <input
                  type="text"
                  value={data.mobile}
                  onChange={(e) => handleInputChange(index, 'mobile', e.target.value)}
                />
              ) : (
                data.mobile
              )}
            </td>
            <td>
              {editingRow === index ? (
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                />
              ) : (
                data.address
              )}
            </td>
            <td>
              {editingRow === index ? (
             <button
             type="button"
             className="btn btn-success btn-sm"
             style={{ width: '40px' }}
             onClick={() => handleUpdate(index)}
           >
             <MdOutlineDriveFolderUpload />
           </button>
           
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '40px'}}
                  onClick={() => handleEdit(index)}
                >
                  <MdModeEditOutline />

                </button>
              )}
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{ width: '40px' }}
                onClick={() => handleDelete(index)}
              >
            <MdDelete />
                          </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
