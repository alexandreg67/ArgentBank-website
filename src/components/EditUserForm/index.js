import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './index.css';
import { updateUserProfile } from '../../features/user/userSlice';

const EditUserForm = ({ user, onCancel }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.userName);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userName: username }));
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="input-wrapper">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={user.firstName}
          readOnly
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={user.lastName}
          readOnly
        />
      </div>
      <button type="submit" className="save-button">Save</button>
      <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditUserForm;