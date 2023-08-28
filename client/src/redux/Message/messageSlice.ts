import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { addMessages, getMessages } from './messageService';

const initialState: { data: any; isLoading: boolean; error: any } = {
	data: null,
	isLoading: false,
	error: null,
};

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		updateMessages(state, action: PayloadAction<any>) {
			state.data.messages = [...state.data.messages, action.payload];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMessages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getMessages.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.data = action.payload.data;
					state.isLoading = false;
					state.error = null;
				}
			)
			.addCase(getMessages.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			})
			.addCase(addMessages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				addMessages.fulfilled,
				(state, action: PayloadAction<any>) => {
					// state.data = action.payload.data;
					state.isLoading = false;
					state.error = null;
				}
			)
			.addCase(addMessages.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { updateMessages } = messageSlice.actions;
export const selectMessages = (state: RootState) => state.message;

export default messageSlice.reducer;
