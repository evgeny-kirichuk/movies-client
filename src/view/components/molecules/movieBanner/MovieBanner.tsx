import React, { useEffect, useRef, useState } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { IMovieResponse } from '~schemas/movie';
import { useAppDispatch } from '~store/store';
import Button from '~atoms/button/Button';
import VolumeButton from '~atoms/VolumeButton/VolumeButton';
import { useActiveMovie } from '~slices/movies';

import styles from './movieBanned.module.scss';

const MovieBanner: React.FC<{
	movie: IMovieResponse;
	onInfoClick: ActionCreatorWithPayload<string, string>;
}> = ({ movie, onInfoClick }) => {
	const dispatch = useAppDispatch();
	const player = useRef<HTMLVideoElement>(null);
	const [muted, setMuted] = useState(true);
	const activeMovie = useActiveMovie();
	const releaseDate = new Date(movie.releaseDate);
	const releaseYear = releaseDate.getFullYear();

	useEffect(() => {
		if (activeMovie) {
			player.current?.pause();
		} else {
			player.current?.play();
		}
	}, [activeMovie, player]);

	const openMovieDetails = () => {
		dispatch(onInfoClick(movie._id));
	};

	return (
		<div className={styles.playerWrapper}>
			<video ref={player} playsInline loop width="100%" muted={muted} autoPlay>
				<source src={movie.trailerLink} type="video/mp4" />
				<track default kind="captions" />
				Your browser does not support the video tag.
			</video>
			<div className={styles.overlay}>
				<div className={styles.movieDetails}>
					<div className={styles.titleBlock}>
						<span className={styles.title}>{movie.title}</span>
						<span className={styles.description}>
							{movie.description.length > 150
								? `${movie.description.slice(0, 150)}...`
								: movie.description}
						</span>
					</div>
					<div className={styles.controlsBlock}>
						<Button onClick={openMovieDetails} className={styles.detailsButton}>
							More info
						</Button>
						<VolumeButton
							className={styles.volumeButton}
							muted={muted}
							onClick={() => setMuted(!muted)}
						/>
						<div className={styles.genreAndYear}>
							<span>{`${movie.genre}, ${releaseYear}`}</span>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.leftGradient} />
			<div className={styles.bottomGradient} />
		</div>
	);
};

export default MovieBanner;
