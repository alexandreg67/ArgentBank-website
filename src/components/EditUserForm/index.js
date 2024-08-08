import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import { updateUserProfile } from "../../features/user/userSlice";

const EditUserForm = ({ user, onCancel }) => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState(user.userName);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUserProfile({ userName: username }));
		onCancel();
	};

	return (
		<div className="edit-user-form">
			<h1>Edit user info</h1>
			<form onSubmit={handleSubmit}>
				<div className="input-wrapper">
					<label htmlFor="username">User Name :</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="firstName">First Name :</label>
					<input type="text" id="firstName" value={user.firstName} disabled />
				</div>
				<div className="input-wrapper">
					<label htmlFor="lastName">Last Name :</label>
					<input type="text" id="lastName" value={user.lastName} disabled />
				</div>
				<div className="button-group">
					<button type="submit" className="update-button">
						Save
					</button>
					<button type="button" className="cancel-button" onClick={onCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditUserForm;
