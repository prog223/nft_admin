import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getContent = createAsyncThunk(
	'getContent',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('content');
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const updateContent = createAsyncThunk(
	'updateContent',
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await axios.post('content/update', data);
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);
