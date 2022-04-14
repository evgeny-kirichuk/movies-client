import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { createAsyncReducers } from '~store/asyncReducer';
import { UserRoles } from '~/contants/userRoles';

import { name } from './constants';
import { login, signup } from './thunks';

export interface IAuthError {
	email?: {
		msg: string;
	};
	password?: {
		msg: string;
	};
	secondPassword?: {
		msg: string;
	};
}

export interface ISessionData {
	loggedIn: boolean;
	userRole: UserRoles;
	token: string;
}

const initialState: GenericState<ISessionData, undefined, IAuthError> = {
	data: {
		loggedIn: false,
		userRole: UserRoles.guest,
		token: '',
	},
	loading: 'idle',
	error: null,
};

export const auth = createSlice({
	name: name,
	initialState,
	reducers: {
		logout() {
			return initialState;
		},
		resetAuthError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		const { pending, fulfilled, rejected } =
			createAsyncReducers<ISessionData>();

		builder
			.addCase(login.pending, pending)
			.addCase(login.fulfilled, fulfilled)
			.addCase(login.rejected, rejected)
			.addCase(signup.pending, pending)
			.addCase(signup.fulfilled, (state) => {
				return {
					...state,
					loading: 'fulfilled',
				};
			})
			.addCase(signup.rejected, rejected);
	},
});

export const { logout, resetAuthError } = auth.actions;

export const persistedAuthReducer = persistReducer(
	{
		key: name,
		whitelist: ['data'],
		storage,
	},
	auth.reducer
);
