import { combineReducers } from '@reduxjs/toolkit';
import { movies } from '~slices/movies';
import { playlist } from '~slices/playlist';
import { auth, persistedAuthReducer } from '~slices/auth/slice';


const rootReducer = combineReducers({
	[movies.name]: movies.reducer,
	[playlist.name]: playlist.reducer,
	[auth.name]: persistedAuthReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
