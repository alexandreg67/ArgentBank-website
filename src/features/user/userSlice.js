import { createSlice } from "@reduxjs/toolkit";
import { loginUser, fetchUserProfile, updateUserProfile } from "./thunks";

const initialState = {
	user: null,
	status: "unlogged",
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout(state) {
			state.user = null;
			state.status = "unlogged";
			localStorage.removeItem("token");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loginUser.fulfilled, (state) => {
				state.status = "succeeded";
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(fetchUserProfile.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.user = action.payload;
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(updateUserProfile.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.user = action.payload;
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
