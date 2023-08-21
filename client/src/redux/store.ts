import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import userReducer from './User/userSlice';
import collectionReducer from './Collection/collectionSlice';
import nftReducer from './Nft/nftSlice';
import infoReducer from './Info/infoSlice';
import contentReducer from './Content/contentSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		collection: collectionReducer,
		nft: nftReducer,
		info: infoReducer,
		content: contentReducer
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
