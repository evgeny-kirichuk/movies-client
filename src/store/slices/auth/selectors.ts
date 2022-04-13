import { shallowEqual, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '~store/reducers';
import { name } from './constants';

export const authSelector = (state: RootState) => state[name];
export const authTokenSelector = (state: RootState) => authSelector(state).data.token;

const selectAuthData = createSelector(
	(state: RootState) => authSelector(state).data,
	(_: RootState) => _,
	(data) => data
);

const selectIsLoggedIn = createSelector(
	selectAuthData,
	(_: RootState) => _,
	({loggedIn}) => loggedIn
);

const selectLoading = createSelector(
	authSelector,
	(_: RootState) => _,
	({loading}) => loading
);

const selectError = createSelector(
	authSelector,
	(_: RootState) => _,
	({error}) => error
);

export const useAuthData = () => useSelector(
	selectAuthData,
	shallowEqual
)

export const useLoggedIn = () => useSelector(
	selectIsLoggedIn,
	shallowEqual
)

export const useAuthLoading = () => useSelector(
	selectLoading,
	shallowEqual
)

export const useAuthError = () => useSelector(
	selectError,
	shallowEqual
)
