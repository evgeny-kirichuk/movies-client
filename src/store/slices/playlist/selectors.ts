import { shallowEqual, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '~store/reducers';
import { name } from './constants';

export const playlistSelector = (state: RootState) => state[name];

const selectPlaylist = createSelector(
	(state: RootState) => playlistSelector(state).data,
	(_: RootState) => _,
	(playlist) => playlist
);

const selectIsMovieInList = createSelector(
	(state: RootState) => playlistSelector(state).data,
	(_: RootState, id: number | string) => id,
	(playlist, id) => !!playlist.find(m => m._id === id)
);

export const useIsMovieInList = (id: string) => useSelector(
	(state: RootState) => selectIsMovieInList(state ,id),
	shallowEqual
)

export const usePlaylist = () => useSelector(
	selectPlaylist,
	shallowEqual
)
