import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getUsers } from './userService';

const initialState: { data: any; isLoading: boolean; error: any } = {
	data: null,
	isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
				state.data = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const selectUsers = (state: RootState) => state.user;

export default userSlice.reducer;
