import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { createAsyncReducers } from '~store/asyncReducer';
import { IMovieResponse } from '~schemas/movie';

import { name } from './constants';
import { getMovies } from './thunks';

export interface MoviesState {
	movies: IMovieResponse[];
	activeMovie: string | null;
}

const initialState: GenericState<MoviesState> = {
	data: {
		movies: [],
		activeMovie: null,
	},
	loading: 'idle',
	error: null,
};

export const movies = createSlice({
	name: name,
	initialState,
	reducers: {
		resetActiveMovie: (state) => {
			state.data.activeMovie = null;
		},
		setActiveMovie: (state, action: PayloadAction<string>) => {
			state.data.activeMovie = action.payload;
		},
	},
	extraReducers: (builder) => {
		const { pending, rejected } = createAsyncReducers<MoviesState>();

		builder
			.addCase(getMovies.pending, pending)
			.addCase(getMovies.fulfilled, (state, { payload }) => {
				return {
					...state,
					data: {
						...state.data,
						movies: payload,
					},
					loading: 'fulfilled',
				};
			})
			.addCase(getMovies.rejected, rejected);
	},
});

export const { resetActiveMovie, setActiveMovie } = movies.actions;
