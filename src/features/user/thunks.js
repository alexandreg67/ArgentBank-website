import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				"http://localhost:3001/api/v1/user/login",
				{ email, password }
			);
			const token = response.data.body.token;
			localStorage.setItem("token", token);
		} catch (error) {
			if (error.response && error.response.data) {
				return rejectWithValue(error.response.data);
			} else {
				return rejectWithValue({ message: "An unknown error occurred" });
			}
		}
	}
);

export const fetchUserProfile = createAsyncThunk(
	"user/fetchUserProfile",
	async (_, { rejectWithValue }) => {
		const token = localStorage.getItem("token");
		if (!token) {
			return rejectWithValue({ message: "No token found" });
		}
		try {
			const response = await axios.post(
				"http://localhost:3001/api/v1/user/profile",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.body;
		} catch (error) {
			if (error.response && error.response.data) {
				return rejectWithValue(error.response.data);
			} else {
				return rejectWithValue({ message: "An unknown error occurred" });
			}
		}
	}
);

export const updateUserProfile = createAsyncThunk(
	"user/updateUserProfile",
	async ({ userName }, { rejectWithValue }) => {
		const token = localStorage.getItem("token");
		if (!token) {
			return rejectWithValue({ message: "No token found" });
		}
		try {
			const response = await axios.put(
				"http://localhost:3001/api/v1/user/profile",
				{ userName },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.body;
		} catch (error) {
			if (error.response && error.response.data) {
				return rejectWithValue(error.response.data);
			} else {
				return rejectWithValue({ message: "An unknown error occurred" });
			}
		}
	}
);
