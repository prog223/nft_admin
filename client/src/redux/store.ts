import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import userReducer from './User/userSlice';
import collectionReducer from './Collection/collectionSlice';
import nftReducer from './Nft/nftSlice';
import infoReducer from './Info/infoSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		collection: collectionReducer,
		nft: nftReducer,
		info: infoReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
