import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createNft, deleteNfts, getNft, getNfts } from './nftService';

const initialState: {
	data: any;
	isLoading: boolean;
	error: any;
	nft: { data: any; isLoading: boolean; error: any };
} = {
	data: null,
	isLoading: false,
	error: null,
	nft: {
		data: null,
		isLoading: false,
		error: null,
	},
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
			.addCase(deleteNfts.fulfilled, (state) => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(deleteNfts.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(getNft.pending, (state) => {
				state.nft.isLoading = true;
			})
			.addCase(getNft.fulfilled, (state, action: PayloadAction<any>) => {
				state.nft.data = action.payload.data
				state.nft.isLoading = false;
				state.nft.error = null;
			})
			.addCase(getNft.rejected, (state, action: PayloadAction<any>) => {
				state.nft.error = action.payload;
				state.nft.isLoading = false;
			});
	},
});

export const selectNfts = (state: RootState) => state.nft;

export default nftSlice.reducer;
