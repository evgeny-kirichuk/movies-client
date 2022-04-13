import { shallowEqual, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '~store/reducers';
import { name } from './constants';
import {IMovieResponse} from "~schemas/movie";

export const moviesSelector = (state: RootState) => state[name];

const selectMoviesLoading = createSelector(
	(state: RootState) => moviesSelector(state),
	(_: RootState) => _,
	({loading}) => loading
);

const selectActiveMovie = createSelector(
	(state: RootState) => moviesSelector(state).data,
	(_: RootState) => _,
	({movies, activeMovie}) => movies.find(m => m._id === activeMovie) || null
);

const selectMovieById = createSelector(
	(state: RootState) => moviesSelector(state).data,
	(_: RootState, id: number | string) => id,
	({movies}, id) => movies.find(m => m._id === id)
);

const selectAllMovies = createSelector(
	(state: RootState) => moviesSelector(state).data,
	(_: RootState) => _,
	({movies}) => movies
);

interface ICategory {
	[k: string] : Array<IMovieResponse>
}

const selectAllNormalizedMovies = createSelector(
	(state: RootState) => moviesSelector(state).data,
	(_: RootState) => _,
	({movies}) => movies.reduce((acc: ICategory, value) => {
		if (!acc[value.genre]) {
			acc[value.genre] = [];
		}

		acc[value.genre].push(value);

		return acc;
	}, {})
);

const selectRandomMovie = createSelector(
	(state: RootState) => moviesSelector(state).data,
	(_: RootState, index: number) => index,
	({movies}, index) => movies[index]
);

export const useActiveMovie = () => useSelector(
	selectActiveMovie
)

export const useMoviesLoading = () => useSelector(
	selectMoviesLoading
)

export const useMovieById = (id: string) => useSelector(
	(state: RootState) => selectMovieById(state ,id),
	shallowEqual
	)

export const useAllMovies = () => useSelector(
	selectAllMovies,
	shallowEqual
)

export const useAllNormalizedMovies = () => useSelector(
	selectAllNormalizedMovies,
	shallowEqual
)

export const useRandomMovie = (index: number) => useSelector(
	(state: RootState) => selectRandomMovie(state ,index),
	shallowEqual
)
