import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import { updateUserProfile } from "../../features/user/thunks";

const EditUserForm = ({ user, onCancel }) => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState(user.userName);
	const [errors, setErrors] = useState({});
	const [confirmationMessage, setConfirmationMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		let validationErrors = {};

		if (!username.trim()) {
			validationErrors.username = "Username cannot be empty";
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			try {
				await dispatch(updateUserProfile({ userName: username })).unwrap();
				setConfirmationMessage("Username has been successfully updated!");
				setErrors({});
			} catch (error) {
				console.error("Failed to update username:", error);
				setConfirmationMessage(
					"An error occurred while updating the username."
				);
			}
		}
	};

	return (
		<section className="edit-content">
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
					{errors.username && (
						<p className="error-message">{errors.username}</p>
					)}
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
				{confirmationMessage && (
					<p className="confirmation-message">{confirmationMessage}</p>
				)}
			</form>
		</section>
	);
};

export default EditUserForm;
