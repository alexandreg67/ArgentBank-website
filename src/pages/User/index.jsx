import React from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import EditUserForm from "../../components/EditUserForm";
import { fetchUserProfile } from "../../features/user/thunks";

export default function User() {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		if (!user) {
			dispatch(fetchUserProfile());
		}
	}, [user, dispatch]);

	const handleCancel = () => {
		setEditing(false);
	};

	return (
		<main className="main bg-dark">
			<div className="header">
				{!editing && (
					<>
						<h1>
							Welcome back
							<br />
							{user ? `${user.firstName} ${user.lastName}` : ""}!
						</h1>
						<button onClick={() => setEditing(true)} className="edit-button">
							Edit Name
						</button>
					</>
				)}
				{editing && <EditUserForm user={user} onCancel={handleCancel} />}
			</div>
			<h2 className="sr-only">Accounts</h2>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Checking (x8349)</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>

			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Savings (x6712)</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>

			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">Current Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
		</main>
	);
}
