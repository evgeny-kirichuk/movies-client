import { createSlice } from '@reduxjs/toolkit'
import { createAsyncReducers } from '~store/asyncReducer';
import { name } from './constants';
import {IMovieResponse} from "~schemas/movie";
import { getPlaylist, addToPlaylist, deleteFromPlaylist } from './thunks';

const initialState: GenericState<IMovieResponse[]> = {
	data: [],
	loading: "idle",
	error: null,
}

export const playlist = createSlice({
	name: name,
	initialState,
	reducers: {
		resetPlaylist: (state) => {
			state.data = [];
		},
	},
	extraReducers: (builder) => {
		const { pending, fulfilled, rejected } = createAsyncReducers<IMovieResponse[]>();

		builder
			.addCase(getPlaylist.pending, pending)
			.addCase(getPlaylist.fulfilled, fulfilled)
			.addCase(getPlaylist.rejected, rejected)
			.addCase(addToPlaylist.pending, pending)
			.addCase(addToPlaylist.fulfilled, fulfilled)
			.addCase(addToPlaylist.rejected, rejected)
			.addCase(deleteFromPlaylist.pending, pending)
			.addCase(deleteFromPlaylist.fulfilled, fulfilled)
			.addCase(deleteFromPlaylist.rejected, rejected);
	},
})

export const { resetPlaylist } = playlist.actions
