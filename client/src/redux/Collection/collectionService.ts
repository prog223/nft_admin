import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { CollectionT } from '../../setup/type';

export const getCollections = createAsyncThunk(
	'getCollections',
	async (params: any, { rejectWithValue }) => {
		try {
			const response = await axios.get('collection', { params });
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const getCollection = createAsyncThunk(
	'getCollection',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(`collection/${id}`);
			return response;
		} catch (err: any) {
			return rejectWithValue(err);
		}
	}
);

export const createCollection = createAsyncThunk(
	'createCollection',
	async (data: CollectionT, { rejectWithValue }) => {
		try {
			const response = await axios.post('collection', data);
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const deleteCollections = createAsyncThunk(
	'deleteCollections',
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await axios.post('collection/delete', data);
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);
