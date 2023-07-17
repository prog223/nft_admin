import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getDashboardInfo = createAsyncThunk(
	'getDashboardInfo',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('dashboard');
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const getRequests = createAsyncThunk(
	'getRequests',
	async (params: any, { rejectWithValue }) => {
		try {
			const response = await axios.get('request', { params });
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const deleteRequest = createAsyncThunk(
	'deleteRequest',
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await axios.post(`request/delete`, data);
			return response
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const confirmRequest = createAsyncThunk(
	'confirmRequest',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axios.post(`request/confirm/${id}`);
			return response
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);
