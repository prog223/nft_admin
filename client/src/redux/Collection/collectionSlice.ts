import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createCollection, deleteCollections, getCollections } from './collectionService';

const initialState: { data: any; isLoading: boolean; error: any } = {
	data: null,
	isLoading: false,
	error: null,
};

const collectionSlice = createSlice({
	name: 'collection',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCollections.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getCollections.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.data = action.payload.data;
					state.isLoading = false;
					state.error = null;
				}
			)
			.addCase(
				getCollections.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					state.isLoading = false;
				}
			)

			.addCase(createCollection.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				createCollection.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.data = action.payload.data;
					state.isLoading = false;
					state.error = null;
				}
			)
			.addCase(
				createCollection.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					state.isLoading = false;
				}
			)

			.addCase(deleteCollections.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				deleteCollections.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.data = action.payload.data;
					state.isLoading = false;
					state.error = null;
				}
			)
			.addCase(
				deleteCollections.rejected,
				(state, action: PayloadAction<any>) => {
					state.error = action.payload;
					state.isLoading = false;
				}
			);
	},
});

export const selectCollections = (state: RootState) => state.collection;

export default collectionSlice.reducer;
