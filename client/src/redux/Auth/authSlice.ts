import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { changePassword, createAdmin, login, logout } from './authService';

const initialState: { data: any; isLoading: boolean; error: any } = {
	data: {},
	isLoading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			// Login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
				state.data = action.payload.data;
				state.isLoading = false;
				state.error = null;
				localStorage.setItem('user', JSON.stringify(action.payload.data));
			})
			.addCase(login.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(changePassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changePassword.fulfilled, (state, action: PayloadAction<any>) => {
				state.data = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			// Logout
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state, action: PayloadAction<any>) => {
				state.data = action.payload.data;
				state.isLoading = false;
				state.error = null;
				localStorage.removeItem('user');
				window.location.reload()
			})
			.addCase(logout.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			// Logout
			.addCase(createAdmin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createAdmin.fulfilled, (state, action: PayloadAction<any>) => {
				state.data = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(createAdmin.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})
	},
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
