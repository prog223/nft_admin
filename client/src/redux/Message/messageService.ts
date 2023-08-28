import { createAsyncThunk } from '@reduxjs/toolkit';
import { MessageT } from '../../setup/type';
import axios from '../../api/axios';

export const getMessages = createAsyncThunk(
	'getMessages',
	async (data: MessageT, { rejectWithValue }) => {
		try {
			const response = await axios.post('message/getMessages', data);
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const addMessages = createAsyncThunk(
	'addMessages',
	async (data: MessageT, { rejectWithValue }) => {
		try {
			const response = await axios.post('message/addMessage', data);
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);
