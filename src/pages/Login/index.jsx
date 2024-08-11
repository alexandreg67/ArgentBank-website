import React, { useState, useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [localError, setLocalError] = useState({});
	const [serverError, setServerError] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userStatus = useSelector((state) => state.user.status);

	const handleSubmit = (e) => {
		e.preventDefault();

		let errors = {};

		if (!email) {
			errors.email = "Email is required";
		}
		if (!password) {
			errors.password = "Password is required";
		}

		setLocalError(errors);

		if (Object.keys(errors).length === 0) {
			dispatch(loginUser({ email, password }))
				.unwrap()
				.catch((e) => {
					console.log("error", e);
					setServerError(e.message);
				});
		}
	};
	useEffect(() => {
		if (userStatus === "succeeded") {
			dispatch(fetchUserProfile());
			navigate("/user");
		}
	}, [userStatus, dispatch, navigate]);

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{localError.email && (
							<p className="error-message">{localError.email}</p>
						)}
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{localError.password && (
							<p className="error-message">{localError.password}</p>
						)}
						{serverError && <p className="error-message">{serverError}</p>}
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>

					<button type="submit" className="sign-in-button">
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
};

export default Login;
