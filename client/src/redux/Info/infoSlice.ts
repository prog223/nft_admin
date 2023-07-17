import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { confirmRequest, deleteRequest, getDashboardInfo, getRequests } from './infoService';

const initialState: { data: any; isLoading: boolean; error: any } = {
	data: {
		info: null,
		requests: null
	},
	isLoading: false,
	error: null,
};

const infoSlice = createSlice({
	name: 'info',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDashboardInfo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDashboardInfo.fulfilled, (state, action: PayloadAction<any>) => {
				state.data.info = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(getDashboardInfo.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(getRequests.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRequests.fulfilled, (state, action: PayloadAction<any>) => {
				state.data.requests = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(getRequests.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(deleteRequest.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteRequest.fulfilled, (state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(deleteRequest.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(confirmRequest.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(confirmRequest.fulfilled, (state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(confirmRequest.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})
	},
});

export const selectInfo = (state: RootState) => state.info;

export default infoSlice.reducer;
