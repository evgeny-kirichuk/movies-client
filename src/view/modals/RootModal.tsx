import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {useAppDispatch} from "~store/store";
import {resetActiveMovie, setActiveMovie, useActiveMovie} from "~slices/movies";
import {modalQueries} from "~modals/constants";

import { LoginFrom } from '~organisms/login/LoginForm';
import { MovieDetails } from "~organisms/movieDetails/MovieDetails";
import { SignupForm } from '~organisms/signUp/SignupForm';

const  RootModal = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const activeMovie = useActiveMovie();
	const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
	const showLoginQuery = query.get(modalQueries.LOGIN);
	const showDetailsQuery = query.get(modalQueries.MOVIE_ID);
	const showSignupQuery = query.get(modalQueries.SIGNUP);
	const pathAfterModal = query.get('toPath');
	const queryAfterModal = query.get('toQuery');
	const [modalsStatus, setModalsStatus] = useState<{[k: string]: boolean}>({});

	useEffect(() => {
		setModalsStatus({
			[modalQueries.LOGIN]: !!showLoginQuery,
			[modalQueries.MOVIE_ID]: !!showDetailsQuery,
			[modalQueries.SIGNUP]: !!showSignupQuery,
		})

		if (showDetailsQuery && !activeMovie) {
			dispatch(setActiveMovie(showDetailsQuery));
		}

		if (!showDetailsQuery && activeMovie) {
			dispatch(resetActiveMovie())
		}
	}, [location.search]);

	useEffect(() => {
		if (activeMovie) {
			navigate({
				pathname: location.pathname,
				search: `?movieId=${activeMovie._id}`,
			});
		}
	}, [activeMovie]);

	return (
		<>
			{
				modalsStatus[modalQueries.LOGIN] && (
					<LoginFrom
						toPath={pathAfterModal}
						toQuery={queryAfterModal}
					/>
				)
			}
			{
				modalsStatus[modalQueries.MOVIE_ID] && (
					<MovieDetails />
				)
			}
			{
				modalsStatus[modalQueries.SIGNUP] && (
					<SignupForm />
				)
			}
		</>
	);
}

export default RootModal;
