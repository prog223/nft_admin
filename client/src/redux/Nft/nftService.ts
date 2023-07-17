import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { NftT } from '../../setup/type';

export const createNft = createAsyncThunk(
	'createNft',
	async (data: NftT, { rejectWithValue }) => {
		try {
			const response = await axios.post('nft', data);
			return response;
		} catch (err:any) {
			return rejectWithValue(err.response)
		}
	}
);

export const getNfts = createAsyncThunk(
	'getNfts',
	async (params:any, { rejectWithValue }) => {
		try {
			const response = await axios.get('nft', { params });
			return response;
		} catch (err:any) {
			return rejectWithValue(err.response)
		}
	}
);


export const deleteNfts = createAsyncThunk(
	'deleteNfts',
	async (data:any, {rejectWithValue}) =>{
		try{
			const response = await axios.post('nft/delete', data);
			return response
		}catch(err:any){
			return rejectWithValue(err.response)
		}
	}
)