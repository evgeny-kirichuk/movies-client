import React, {useState, useEffect} from 'react';
import cn from 'classnames';
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "~store/store";
import { IMovieResponse } from "~schemas/movie";
import styles from './Movie.module.scss';


const Movie: React.FC<{
	movie: IMovieResponse,
	onClick: ActionCreatorWithPayload<string, string>}> = ({movie, onClick}) => {
	const dispatch = useAppDispatch()
	const [mounted, setMounted] = useState(false);
	const releaseDate = new Date(movie.releaseDate);
	const releaseYear = releaseDate.getFullYear();

	useEffect(() => {
		setTimeout(() => {
			setMounted(true);
		}, 50);
	}, []);

	const openMovieDetails = () => {
		dispatch(onClick(movie._id))
	}

	return (
		<div
			onClick={openMovieDetails}
			className={cn(styles.movieGrid, {[styles.mounted]: mounted})}
		>
			<img alt="movie thumbnail" src={movie.thumbnailLink}/>
			<div className={styles.movieInfo}>
				<span className={styles.title}>
					{movie.title}
				</span>
				<span className={styles.genre}>
					{`${releaseYear}, ${movie.genre}`}
				</span>
			</div>
		</div>
	);
}

export default Movie;
