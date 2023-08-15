import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { AdminT, LoginT, changeT } from '../../setup/type';

export const login = createAsyncThunk(
	'login',
	async (data: LoginT, { rejectWithValue }) => {
		try {
			const response = await axios.post('admin/login', data);
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const changePassword = createAsyncThunk(
	'changePassword',
	async (data: changeT, { rejectWithValue }) => {
		try {
			const response = await axios.post('admin/change_password', data);
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

export const createAdmin = createAsyncThunk(
	'createAdmin',
	async (data:AdminT, {rejectWithValue}) =>{
		try{
			const response = await axios.post('admin', data);
			return response;
		}catch(err: any){
			return rejectWithValue(err.response);
		}
	}
)

export const logout = createAsyncThunk(
	'logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.post('admin/logout');
			return response;
		} catch (err: any) {
			return rejectWithValue(err.response);
		}
	}
);

