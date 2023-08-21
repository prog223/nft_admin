import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getContent, updateContent } from './contentService';

const initialState: { data: any; isLoading: boolean; error: any } = {
	data: null,
	isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'content',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getContent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getContent.fulfilled, (state, action: PayloadAction<any>) => {
				state.data = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(getContent.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(updateContent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateContent.fulfilled, (state, action: PayloadAction<any>) => {
				// state.data = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(updateContent.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})
	},
});

export const selectContent = (state: RootState) => state.content;

export default userSlice.reducer;
