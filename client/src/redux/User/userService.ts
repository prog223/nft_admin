import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getUsers = createAsyncThunk(
	'getUsers',
	async (params: any, { rejectWithValue }) => {
		try {
			const response = await axios.get('user', { params });
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const deleteUsers = createAsyncThunk(
	'deleteUsers',
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await axios.post('user/delete', data);
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);
