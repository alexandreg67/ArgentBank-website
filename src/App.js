import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import User from "./pages/User";
import { fetchUserProfile } from "./features/user/thunks";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			dispatch(fetchUserProfile());
		}
	}, [dispatch]);

	return (
		<Router>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/user" element={<PrivateRoute />}>
						<Route path="/user" element={<User />} />
					</Route>
					<Route path="*" element={<Error />} />
				</Routes>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
