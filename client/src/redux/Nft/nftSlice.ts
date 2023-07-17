import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createNft, deleteNfts, getNfts } from './nftService';

const initialState: { data: any; isLoading: boolean; error: any } = {
	data: null,
	isLoading: false,
	error: null,
};

const nftSlice = createSlice({
	name: 'nft',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createNft.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createNft.fulfilled, (state, action: PayloadAction<any>) => {
				state.data = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(createNft.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(getNfts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getNfts.fulfilled, (state, action: PayloadAction<any>) => {
				state.data = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(getNfts.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(deleteNfts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteNfts.fulfilled, (state, action: PayloadAction<any>) => {
				
				state.isLoading = false;
				state.error = null;
			})
			.addCase(deleteNfts.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const selectNfts = (state: RootState) => state.nft;

export default nftSlice.reducer;
